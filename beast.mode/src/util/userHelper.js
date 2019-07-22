const checkAndSetUser = (setUserFunction, setNotification) => {
  const rawUser = window.localStorage.getItem('currentUser')
  const savedUser = JSON.parse(rawUser)
  if(savedUser) {
    setUserFunction(savedUser)
    setNotification(`${savedUser.username} logged in`, 3)
  }
}

export default { checkAndSetUser }