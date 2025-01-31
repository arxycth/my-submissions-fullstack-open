import { useState } from 'react'

const Statistics = ({good,neutral, bad}) => {
  const all = good + neutral + bad
  return (
    <div>
      <h1>statistics</h1>
      {good + neutral + bad !== 0?(
        <table>
          <tbody>
            <StatisticLine text='good' value={good}/>
            <StatisticLine text='neutral' value={neutral}/>
            <StatisticLine text='bad' value={bad}/>
            <StatisticLine text='all' value={all}/>
            <StatisticLine text='average' value={(good - bad) / all}/>
            <StatisticLine text='positive' value={good/all*100 + '%'}/>
          </tbody>
        </table>
      ):(
        <p>No feedback given</p>
      )}
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodUp = () => {
    setGood(good + 1)
  }

  const neutralUp = () => {
    setNeutral(neutral + 1)
  }

  const badUp = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodUp} text='good'/>
      <Button onClick={neutralUp} text='neutral'/>
      <Button onClick={badUp} text='bad'/>
      <Statistics good={good} neutral ={neutral} bad={bad} /> 
    </div>
  )
}


export default App
