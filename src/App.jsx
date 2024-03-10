import { useEffect, useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [className, setClassName] = useState('notification')

  useEffect(() => {
    console.log('Get Persons from db')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  //console.log('render', persons.length, 'persons')

  const handleSearch = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDeletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      personService
      .remove(id)
      .then(returnedPerson => {
        console.log('Removed', returnedPerson)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const addName = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    console.log(`Post ${person.name} to db`)
    const existingPerson = persons.find(obj => obj.name === person.name) 
    if(existingPerson) {
      if(window.confirm(`${existingPerson.name} already added to phonebook, replace the old number with new one?`)) {
        personService
          .update(existingPerson.id, person)
          .then(returnedPerson => {
            setPersons(
              persons.map(contact => 
                contact.id === returnedPerson.id
                  ? returnedPerson
                  : contact
              )
            )
            setClassName('notification')
            setNotificationMessage(`Updated ${returnedPerson.name}`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setClassName('error')
            setNotificationMessage(
              `Information of '${existingPerson.name}' has already been removed from server`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setPersons(persons.filter(n => n.id !== existingPerson.id))
          })
      }
    } else {
      personService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setClassName('notification')
          setNotificationMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const personsToShow = filter.length > 0
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} className={className}/>
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
      {personsToShow && personsToShow.map(person => 
        <Person 
          key={person.name} 
          name={person.name}
          number={person.number}
          handleDeletePerson={() => handleDeletePerson(person.id, person.name)}/>
      )}
    </div>
  )
}

export default App