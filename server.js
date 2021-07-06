const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const path = require('path')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/blauw', {useNewUrlParser: true, useUnifiedTopology: true});
require(path.join(__dirname, 'socket_management/SocketManager'))(server)
server.listen(8080, () => console.log('Server listening on Port: 8080'))

app.get('/', (req, res) => {
  console.log('Home Connection')
  res.send('<h1>Home</h1>')
})