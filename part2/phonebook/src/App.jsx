import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  },[])

  const handleSubmit = (event) =>{
    event.preventDefault()
    const temp = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === temp.name)){
      if(window.confirm(`${temp.name} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(person => person.name === temp.name)
        personService
          .update(temp, person.id)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id == returnedPerson.id? returnedPerson : person))
            setMessage(`Number Changed ${temp.name}`)
            setError(false)
            setTimeout(() => {
              setMessage(null)
              setError(null)
            }, 5000)
            setNewName('')
            setNewNumber('')    
          })
      }
    }else{
      personService
        .create(temp)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${temp.name}`)
          setNewName('')
          setNewNumber('')
        }) 
    }
      
  }

  const personsFilter = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const handleDelete = ({name, id}) => {
    if(window.confirm(`Delete ${name}`)){
      personService
        .deleteSome(id)
        .then(returnedPerson => {
          setPersons(persons.toSpliced(persons.indexOf(returnedPerson),1))
        })
        .catch(error => {
          setMessage(
            `Information of '${name}' has already been removed from server`
          )
          setError(true)
          setTimeout(() => {
            setMessage(null)
            setError(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} error={error}/>

      <Filter newFilter={newFilter} setNewFilter={setNewFilter}/>

      <h2>add a new</h2>

      <PersonForm handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>

      <h2>Numbers</h2>
      
      <Persons personsFilter={personsFilter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
