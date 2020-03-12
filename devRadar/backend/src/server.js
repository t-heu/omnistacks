require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const Sentry = require('@sentry/node')

Sentry.init({
  dsn: process.env.SENTRY_DSN
});

const routes = require('./routes')
const { setupWebsocket } = require('./websocket')
const app = express()
const server = http.Server(app)
setupWebsocket(server)

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(process.env.PORT || 3333)
console.log('run')
