import { useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '4048894994' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleSearch = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

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

  const personsToShow = filter.length
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch}/>
      <h2>add new</h2>
      <PersonForm
        addName={addName} 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {personsToShow.map(person => 
        <Person 
          key={person.name} 
          name={person.name}
          number={person.number}/>
      )}
    </div>
  )
}

export default App