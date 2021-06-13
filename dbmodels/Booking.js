const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  _id: {type: String, required: true},
  booking_name: {type: String, required: true},
  checkin_date: {type: Number, required: true},
  room: {type: Number, required: true},
  nights: {type: Number, required: true},
  status: {type: String, required: true},
  checked_in: {type: Boolean, required: true}
})

module.exports = mongoose.model('booking', schema)