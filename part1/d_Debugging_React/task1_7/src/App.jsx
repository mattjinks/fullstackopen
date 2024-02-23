import { useState } from 'react'

const Positive = (props) => {
  const positive = props.good / props.all
  const percentage = positive * 100
  return (
    <p>positive {percentage} %</p>
  )
}

const Average = ({ good, bad, all}) => {
  const avg = (good + (-1 * bad)) / all
  return (
    <p>average {avg}</p>
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
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <Average good={good} bad={bad} all={all}/>
      <Positive good={good} all={all}/>
    </div>
  )
  
}

export default App