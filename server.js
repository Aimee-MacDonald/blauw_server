const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.get('/', (req, res) => {
  console.log('Connection!')
  res.status(200).json('OK')
})

io.on('connection', socket => {
  socket.on('test', msg => {
    console.log('Message Recieved')
    console.log(msg)
    socket.emit('test', 'It works!')
  })
})

server.listen(8080, () => console.log('Server Started Up,\nListening on Port: 8080'))