const Persons = ({personsFilter, handleDelete}) =>(
    <div>
        {personsFilter.map(person =>(
               <p key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button> </p> 
        ))} 
    </div>  
)

export default Persons