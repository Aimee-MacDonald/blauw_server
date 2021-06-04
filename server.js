const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const path = require('path')
const mongoose = require('mongoose')

const {createBooking} = require(path.join(__dirname, 'state_management/actions/bookings'))
const Booking = require(path.join(__dirname, 'dbmodels/Booking.js'))

mongoose.connect('mongodb://localhost/blauw', {useNewUrlParser: true, useUnifiedTopology: true});

io.on('connection', socket => {
  socket.on('bookings', ({type, payload}) => {
    switch(type){
      case 'CREATE_BOOKING':
        const newBooking = new Booking({
          _id: payload._id,
          booking_name: payload.booking_name,
          checkin_date: payload.checkin_date,
          room: payload.room,
          nights: payload.nights
        })

        newBooking.save(error => {if(error) console.log(error)})

      case 'DELETE_BOOKING':
        Booking.findByIdAndRemove(payload, error => {if(error) console.log(error)})

      case 'REFRESH_BOOKINGS':
        const bookings = Booking.find({}, (error, result) => {
          if(error){
            console.log(error)
          } else {
            result.forEach(booking => socket.emit('dispatchAction', createBooking(booking)))
          }
        })
    }
  })
})

server.listen(8080, () => console.log('Server Started Up,\nListening on Port: 8080'))