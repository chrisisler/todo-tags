import express from 'express'
import sqlite from 'sqlite'

const PORT = 8080

let server = express()

// GET - /todos - Get all of the todos
server.get('/todos', (request, response) => {

})

// POST - /todos - Create a single todo
server.post('/todos', (request, response) => {

})

// DELETE - /todos/:todo_id - Delete a single todo
server.delete('/todos/:id', (request, response) => {
  let id = request.params.id
})

server.listen(PORT)
