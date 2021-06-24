const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  _id: {type: String, required: true},
  name: {type: String, required: true},
  group: {type: String, required: true},
  shared: {type: Boolean, required: true},
  maxPax: {type: Number, required: true},
  basePrice: {type: Number, required: false},
  personPrice: {type: Number, required: false},
  showBeds: {type: Boolean, required: true}
})

module.exports = mongoose.model('room', schema)