const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)
const path = require('path')
const mongoose = require('mongoose')

const appRoute = require(path.join(__dirname, 'routes/app'))
app.use('/app', appRoute)

mongoose.connect('mongodb://localhost/blauw', {useNewUrlParser: true, useUnifiedTopology: true});
require(path.join(__dirname, 'socket_management/SocketManager'))(server)
server.listen(8080, () => console.log('Server listening on Port: 8080'))