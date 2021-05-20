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
          _id: payload.id,
          booking_name: payload.name,
          checkin_date: payload.date,
          room: payload.room,
          nights: payload.nights
        })

        newBooking.save(error => {if(error) console.log(error)})
    }

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