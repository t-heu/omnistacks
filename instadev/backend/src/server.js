const express = require('express')
const app = express()
const path = require('path')
const routes = require('./routes')
const cors = require('cors')

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use((req, res, next) => {
  req.io = io 
  next()
})

app.use(cors())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))
app.use(routes)

server.listen(3333)
