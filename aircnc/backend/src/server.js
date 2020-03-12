require('dotenv/config')

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const socketio = require('socket.io')
const http = require('http')

const routes = require('./routes')
const app = express()
const server = http.Server(app)
const io = socketio(server)

mongoose.connect(
  process.env.MONGO_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connectedUser = {}

io.on('connection', socket => {
   const { user_id } = socket.handshake.query

  connectedUser[user_id] = socket.id
})

app.use((req, res, next) => {
  req.io = io
  req.connectedUsers = connectedUser
  return next()
})

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

server.listen(process.env.PORT)

