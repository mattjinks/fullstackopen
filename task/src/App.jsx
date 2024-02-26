import { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '4048894994' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    //const personsCopy = [...persons]
    if(persons.some(obj => obj.name === person.name)) {
      alert(`${person.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>

      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <Name 
          key={person.name} 
          name={person.name}
          number={person.number}/>
      )}
    </div>
  )
}

export default App