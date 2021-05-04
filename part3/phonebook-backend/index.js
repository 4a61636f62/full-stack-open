require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

morgan.token('person', (request) => (
    request.method === 'POST'
        ?
        JSON.stringify(request.body)
        :
        ""
))

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: 'unknown endpoint' })
    next()
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const now = new Date()
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        ${now}
    `)
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
          if(person) {
              response.json(person)
          }  else {
              response.status(404).end()
          }
        })
        .catch(error => next(error))
});

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const error = (response, status, message) => (
    response.status(status).json({
        error: message
    })
)

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
            .then(savedPerson => savedPerson.toJSON())
            .then(savedAndFormattedPerson => {
                response.json(savedAndFormattedPerson)
            })
            .catch(error => next(error))
    })

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const update = { number: body.number }

    Person.findByIdAndUpdate(request.params.id, update , {new: true, runValidators: true, context: 'query'})
        .then(updatedPerson => {
            if (updatedPerson) {
                response.json(updatedPerson)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})


app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`starting server on port ${PORT}`)
})
