const createRoom = roomData => ({
  type: 'CREATE_ROOM',
  payload: roomData
})

module.exports = {createRoom}