import communicationService from '../service/communication'

const currentProfileReducer = (state = { id: null }, action) => {
  switch (action.type) {
    case 'INIT_CURRENT_PROFILE':
      return action.data
    default:
      return state
  }
}

// RETURN TO PREVIOUS CODE AND MODIFY TEST !!!!
export const initCurrentProfile = (id) => {
  return async (dispatch, getState) => {
    console.log(getState())
    dispatch({ type: 'INIT_CURRENT_PROFILE', data: {} })
    const profile = await communicationService.get(`/users/${id}`)
    console.log(profile)

    dispatch({ type: 'INIT_CURRENT_PROFILE', data: profile })

    return
  }
}

export default currentProfileReducer