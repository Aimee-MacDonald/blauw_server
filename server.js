const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const path = require('path')

const {createBooking} = require(path.join(__dirname, 'state_management/actions/bookings'))

io.on('connection', socket => {
  socket.on('bookings', action => {
    console.log('Something about bookings?')
    console.log(action)
    /*
    socket.emit('dispatchAction', createBooking({
      name: 'Charlene',
      date: 2,
      room: 2,
      nights: 2
    }))
    */
  })
})

server.listen(8080, () => console.log('Server Started Up,\nListening on Port: 8080'))