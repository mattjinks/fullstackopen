import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.val}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return ( 
      <p>No feedback given</p>
    )
  }
  const avg = (props.good + (-1 * props.bad)) / props.all
  const positive = (props.good / props.all) * 100
  const percentage = positive + ' %'
  return (
    <div>
      <table>
        <StatisticLine text='good' val={props.good}/>
        <StatisticLine text='neutral' val={props.neutral}/>
        <StatisticLine text='bad' val={props.bad}/>
        <StatisticLine text='all' val={props.all}/>
        <StatisticLine text='average' val={avg}/>
        <StatisticLine text='positive' val={percentage}/>
      </table>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleClickGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleClickBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClickGood} text='good'/>
      <Button handleClick={handleClickNeutral} text='neutral'/>
      <Button handleClick={handleClickBad} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
  
}

export default App