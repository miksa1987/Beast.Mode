import axios from 'axios'

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
    const loggedUser = await axios.post('/login', user)
    window.localStorage.setItem('currentUser', JSON.stringify(loggedUser))
    console.log(loggedUser)
    dispatch({ type: 'LOGIN_USER', data: loggedUser })
  }
}

export const setUser = (user) => {
  return dispatch => dispatch({ type: 'SET_USER', data: user })
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.clear()
    dispatch({ type: 'LOGOUT_USER' })
  }
}

export default currentUserReducer