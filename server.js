const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.get('/', (req, res) => {
  console.log('Connection!')
  res.status(200).json('OK')
})

io.on('connection', socket => {
  console.log('Socket Connection!')
})

server.listen(8080, () => console.log('Server Started Up,\nListening on Port: 8080'))