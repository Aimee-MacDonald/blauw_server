const path = require('path')

const {createRoom} = require(path.join(__dirname, '../actions/rooms'))
const Room = require(path.join(__dirname, '../../dbmodels/Room.js'))

module.exports = ({type, payload}, socket) => {
  switch(type){
    case 'CREATE_ROOM':
      const newRoom = new Room(payload)
      newRoom.save(error => {if(error) console.log(error)})
      break
    
    case 'DELETE_ROOM':
      console.log('Delete Room')
      console.log(payload)
      break

    case 'UPDATE_ROOM':
      console.log('Update Room')
      console.log(payload)

    case 'REFRESH_ROOMS':
      Room.find({}, (error, result) => {
        if(error){
          console.log(error)
        } else {
          result.forEach(room => socket.emit('dispatchAction', createRoom(room)))
        }
      })
  }
}