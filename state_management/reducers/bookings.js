const path = require('path')

const {createBooking} = require(path.join(__dirname, '../actions/bookings'))
const Booking = require(path.join(__dirname, '../../dbmodels/Booking.js'))

module.exports = ({type, payload}, socket) => {
  switch(type){
    case 'CREATE_BOOKING':
      const newBooking = new Booking({
        _id: payload._id,
        booking_name: payload.booking_name,
        checkin_date: payload.checkin_date,
        room: payload.room,
        nights: payload.nights,
        status: payload.status,
        checked_in: payload.checked_in
      })

      newBooking.save(error => {if(error) console.log(error)})
      break

    case 'DELETE_BOOKING':
      Booking.deleteOne({_id: payload}, error => {if(error) console.log(error)})
      break

    case 'UPDATE_BOOKING':
      Booking.updateOne({_id: payload._id}, {...payload}, error => {if(error) console.log(error)})
      break

    case 'REFRESH_BOOKINGS':
      const bookings = Booking.find({}, (error, result) => {
        if(error){
          console.log(error)
        } else {
          result.forEach(booking => socket.emit('dispatchAction', createBooking(booking)))
        }
      })
      break

    case 'CHECKIN_BOOKING':
      Booking.updateOne({_id: payload}, {
        status: 'checked_in',
        checked_in: true
      }, error => {if(error) console.log(error)})
      break

    case 'CHECKOUT_BOOKING':
      Booking.updateOne({_id: payload}, {
        status: 'checked_out',
        checked_in: false
      }, error => {if(error) console.log(error)})
      break

    case 'UNDO_CHECKOUT':
      Booking.updateOne({_id: payload}, {
        status: 'checked_in',
        checked_in: true
      }, error => {if(error) console.log(error)})
      break
  }
}