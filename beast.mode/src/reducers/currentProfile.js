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
  return async (dispatch, getState) => {
    if (getState().currentProfile !== {} && id !== getState().currentProfile.id) {
      dispatch({ type: 'INIT_CURRENT_PROFILE', data: {} })
      const profile = await communicationService.get(`/users/${id}`)
      console.log(profile)

      dispatch({ type: 'INIT_CURRENT_PROFILE', data: profile })
    }

    return
  }
}

export default currentProfileReducer