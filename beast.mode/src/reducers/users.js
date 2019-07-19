import communicationService from '../service/communication'

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export const initUsers = () => {
  return async (dispatch, getState) => {
    const users = await communicationService.get('/users/randoms')
    dispatch({ type: 'INIT_USERS', data: users })
  }
}

export default usersReducer