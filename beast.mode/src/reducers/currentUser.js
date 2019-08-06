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
    try {
      const result = await axios.post('/login', user)
      const loggedUser = result.data
      communicationService.setToken(loggedUser.token)
      window.localStorage.setItem('currentUser', JSON.stringify(loggedUser))
    
      dispatch({ type: 'LOGIN_USER', data: loggedUser })
      dispatch({ type: 'SET_NOTIFICATION_MESSAGE', data: `${loggedUser.username} logged in`})
      setTimeout(() => {
        dispatch({ type: 'SET_NOTIFICATION_MESSAGE', data: ''})
      }, 3000)
    } catch (error) {
      dispatch({ type: 'SET_NOTIFICATION_MESSAGE', data: 'Username or password incorrect'})
      setTimeout(() => {
        dispatch({ type: 'SET_NOTIFICATION_MESSAGE', data: ''})
      }, 3000)
      console.log(error.message)
    }
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

export const addFriend = (friendId) => {
  return async (dispatch, getState) => {
    if (friendId !== getState().currentUser.id) {
      const updatedUser = await communicationService.post('/users/addfriend', { newfriend: friendId })
      dispatch({ type: 'SET_USER', data: updatedUser })
    }
  }
}

export const removeFriend = (friendId) => {
  return async dispatch => {
    const updatedUser = await communicationService.post('/users/removefriend', { friendToRemove: friendId })
    
    dispatch({ type: 'SET_USER', data: updatedUser })
  }
}

export const updateUser = (data) => {
  return async dispatch => {
    const updatedUser = await communicationService.update('/users/me', data)
    
    console.log(updatedUser)
    window.localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    dispatch({ type: 'SET_USER', data: updatedUser})
  }
}

export default currentUserReducer