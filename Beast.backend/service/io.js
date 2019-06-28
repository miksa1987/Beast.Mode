const io = require('socket.io')

const emit = (event, data) => {
  io.emit(event, data)
}

module.exports = io