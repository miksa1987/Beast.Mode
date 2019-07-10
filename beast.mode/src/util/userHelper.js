const checkAndSetUser = (setUserFunction) => {
  const rawUser = window.localStorage.getItem('currentUser')
  const savedUser = JSON.parse(rawUser)
  if(savedUser) {
    setUserFunction(savedUser)
  }
}

export default { checkAndSetUser }