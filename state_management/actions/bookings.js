const createBooking = bookingData => ({
  type: 'CREATE_BOOKING',
  payload: bookingData
})

module.exports = {createBooking}