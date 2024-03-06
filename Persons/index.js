const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    },
]

app.get('/api/persons', (request, response) => {
    response.send(persons)
})

app.get('/info', (request, response) => {
    let currentTime = new Date()
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${currentTime}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person) {
        response.send(
            `<h2>${person.name}</h2>
            <p>${person.number}</p>`
        )
    } else {
        response.status(404).end()
        console.log(response)
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})