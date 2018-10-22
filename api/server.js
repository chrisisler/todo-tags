import express from 'express'

// import db from './database'

const PORT = 8080

let server = express()

// Allow CORS
server.use((_, response, next) => {
  response.header('Accesss-Control-Allow-Origin', '*')
  response.header('Accesss-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

server.get('/', async (request, response) => {
  try {
    let todos = await db.all()
  } catch (error) {
    console.error(error.message)
  }
})

server.get('/:id', (request, response) => {
  let { id } = request.params
})

server.post('/', (request, response) => {
  let { title } = request.body
})

server.delete('/todos/:id', (request, response) => {
  let { id } = request.params
})

server.listen(PORT)
