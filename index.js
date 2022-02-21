const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

let persons = [
  {
    id: 1,
    name: "Arto Hellas Muuutos",
    number: "040-1234567"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  console.log('length', persons.length)
  res.send(
    `<body>Phonebook has info for ${persons.length} people</body>
    <br>
    <br>
    ${Date()}`
  )
})  

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const randomId = () => {
  return Math.floor(Math.random() * 100000)
} 

app.post('/api/persons', (request, response) => {

  const body = request.body
  
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  } 

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  let loytyy = false
  persons.find(person => {
    if (person.name === body.name) {
      loytyy = true
    }
  })

  if (loytyy) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }


  const person = {
    name: body.name,
    number: body.number,
    id: randomId(),
  }

  persons = persons.concat(person)

  response.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})