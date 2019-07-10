import axios from 'axios'
import communicationService from '../service/communication'

const currentUserReducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      return action.data
    case 'SET_USER':
      return action.data
    case 'LOGOUT_USER':
      return null
    default:
      return state
  }
}

export const loginUser = (user) => {
  return async dispatch => {
    const result = await axios.post('/login', user)
    const loggedUser = result.data
    communicationService.setToken(loggedUser.token)
    window.localStorage.setItem('currentUser', JSON.stringify(loggedUser))
    console.log(loggedUser)
    dispatch({ type: 'LOGIN_USER', data: loggedUser })
  }
}

export const setUser = (user) => {
  return dispatch => {
    communicationService.setToken(user.token)
    dispatch({ type: 'SET_USER', data: user })
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.clear()
    dispatch({ type: 'LOGOUT_USER' })
  }
}

export const updateUser = (data) => {
  return async dispatch => {
    for (let pair of data.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
    const updatedUser = communicationService.update('/users/me', data)
    dispatch({ type: 'SET_USER', data: updatedUser})
  }
}

export default currentUserReducer