let connectedUsers = []

const connectUser = (user) => {
  const connectedUserIds = connectedUsers.map(user => user.id)
  if (connectedUserIds.indexOf(user.id) < 0) connectedUsers = connectedUsers.concat(user)
  console.log(connectedUsers)
}

const disconnectUser = (id) => {
  connectedUsers = connectedUsers.filter(user => user !== id)
}

module.exports = { connectedUsers, connectUser, disconnectUser }