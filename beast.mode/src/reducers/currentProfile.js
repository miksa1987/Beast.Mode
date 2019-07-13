import communicationService from '../service/communication'

const currentProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case 'INIT_CURRENT_PROFILE':
      return action.data
    default:
      return state
  }
}

export const initCurrentProfile = (id) => {
  return async dispatch => {
    const profile = await communicationService.get(`/users/${id}`)
    console.log(profile)

    return dispatch({ type: 'INIT_CURRENT_PROFILE', data: profile })
  }
}

export default currentProfileReducer