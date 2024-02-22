import { useState } from 'react'

const App = () => {
  //The variable counter contains the value of the state , which is therefore initially zero. 
  //The variable setCounter is a reference to a function that can be used to change the state .
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const descreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter}/>
      <Button
        handleClick={increaseByOne} 
        text='plus'
      />
      <Button
        handleClick={descreaseByOne}
        text='minus'
      /> 
      <Button
        handleClick={setToZero}
        text='zero'
      />
    </div>
  )
}

const Display = ({ counter }) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

export default App