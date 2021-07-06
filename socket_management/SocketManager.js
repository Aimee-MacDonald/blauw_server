const path = require('path')

const bookingsReducer = require(path.join(__dirname, '../state_management/reducers/bookings'))
const roomsReducer = require(path.join(__dirname, '../state_management/reducers/rooms'))

module.exports = server => {
  const io = require('socket.io')(server)
  
  io.on('connection', socket => {
    socket.on('bookings', action => bookingsReducer(action, socket))
    socket.on('rooms', action => roomsReducer(action, socket))
  })
}