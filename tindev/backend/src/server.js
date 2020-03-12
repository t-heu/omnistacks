const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const connectUsers = {};

io.on('connection', socket => {
  const { user } = socket.handshake.query
  connectUsers[user] = socket.id
})

const routes = require('./routes')

mongoose.connect('mongodb://semana:semana@cluster0-shard-00-00-qezcp.mongodb.net:27017,cluster0-shard-00-01-qezcp.mongodb.net:27017,cluster0-shard-00-02-qezcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
  { useNewUrlParser: true }
)

app.use((req, res, next) => {
  req.io = io 
  req.connectUsers = connectUsers
  return next()
})

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333)
