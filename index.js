const express = require('express')
const app = express()
var morgan = require('morgan')

app.use(express.json())

const cors = require('cors')

app.use(cors())

app.use(express.static('dist'))

app.use(morgan(function (tokens, req, res) {
    //console.log(req.body)
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  }))

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

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    //console.log(persons)
    if(!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if(!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if(persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number || ''
    }
    persons = persons.concat(person)
    //console.log(persons)
    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const generateId = () => {
    const id = Math.random() * (101 - 0)
    const person = persons.find(person => person.id === id)
    while(person) {
        id = Math.random() * (101 - 0)
        person = persons.find(person => person.id)
    }
    return id
}