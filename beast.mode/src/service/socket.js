import io from 'socket.io-client'

const socket = io()

let user = 'unknown'

socket.on('disconnect', () => {
  socket.emit('disconnect_user', user)
})

const setUser = (id) => user = id

const emitUser = () => socket.emit('connect_user', user)

export default { socket, setUser, emitUser }