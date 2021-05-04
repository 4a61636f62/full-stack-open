import React, {useEffect, useState} from 'react'
import phonebookService from "./services/phonebook"
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')
    const [ notification, setNotification ] = useState(null)

    useEffect(() => {
        phonebookService.getAll().then(allPersons => {
            setPersons(allPersons)
        })
    }, [])

    const notify = (message, color) => {
        setNotification({message, color})
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }
    
    const addPerson = (event) => {
        event.preventDefault()
        const existingPerson = persons.find(person => person.name === newName)
        if (existingPerson) {
            updatePerson(existingPerson)
            return
        }
        const newPerson = {
            name: newName,
            number: newNumber
        }
        phonebookService.add(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson))
                notify(`Added ${newPerson.name}`, 'green')
            })
            .catch(error => {
                notify(error.message, 'red')
            })
    }

    const updatePerson = (personToUpdate) => {
        if (!window.confirm(`update ${personToUpdate.name}'s number to ${newNumber}?`)) {
            return
        }
        const update = { number: newNumber}
        phonebookService.update(update, personToUpdate.id)
            .then(updatedPerson => {
                setPersons(persons.map(person => person.id !== personToUpdate.id ? person : updatedPerson))
                notify(`Updated ${updatedPerson.name}`, 'green')
            })
            .catch(error => {
                if (error.message === 'Not Found') {
                    notify(`${personToUpdate.name} was already deleted from phonebook`, 'red')
                    setPersons(persons.filter(person => person.id !== personToUpdate.id))
                } else {
                    notify(error.message, 'red')
                }
            })
    }

    const deletePerson =(personToDelete) => {
        if (!window.confirm(`do you want to delete ${personToDelete.name} from phonebook?`)) {
            return
        }
        phonebookService._delete(personToDelete.id).then(() => {
        }).catch(() => {
            notify(`${personToDelete.name} was already deleted from phonebook`, 'red')
        })
        setPersons(persons.filter(person => person.id !== personToDelete.id))
    }

    return (
      <div>
          <h2>Phonebook</h2>
          <Notification notification={notification}/>
          <Filter
              filter={filter}
              handleChange={(event) => setFilter(event.target.value)}
          />
          <PersonForm
              addPerson={addPerson}
              newName={newName}
              newNumber={newNumber}
              handleNameChange={(event) => setNewName(event.target.value)}
              handleNumberChange={(event) => setNewNumber(event.target.value)}
          />
          <Persons
              persons={persons.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))}
              handleDelete={deletePerson}
          />
      </div>
    )
}

export default App