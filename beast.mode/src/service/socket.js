import io from 'socket.io-client'

const socket = io()

socket.on('user_add_post', (data) => {
  console.log(data)
})

export default { socket }