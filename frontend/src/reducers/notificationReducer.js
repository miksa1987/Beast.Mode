const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION_MESSAGE':
    return action.data
  default: 
    return state
  }
}

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch({ type: 'SET_NOTIFICATION_MESSAGE', data: message})
    setTimeout(() => {
      dispatch({ type: 'SET_NOTIFICATION_MESSAGE', data: '' })
    }, time * 1000)
  }
}

export default notificationReducer