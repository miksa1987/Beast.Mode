let connectedUsers = []

const connectUser = (socket) => {
  const connectedIds = connectedUsers.map(socket => socket.userid)
  if (connectedIds.indexOf(socket.id) < 0) connectedUsers = connectedUsers.concat(socket)
  console.log(connectedUsers)
}

const disconnectUser = (id) => {
  connectedUsers = connectedUsers.filter(user => user !== id)
}

module.exports = { connectedUsers, connectUser, disconnectUser }