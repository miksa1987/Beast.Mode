import communicationService from '../service/communication'

const currentPostReducer = (state = {}, action) => {
  switch (action.type) {
    case 'INIT_CURRENT_POST':
      return action.data
    default:
      return state
  }
}

export const initCurrentPost = (type, id) => {
  return async dispatch => {
    let post = {}

    if (type === 'post') post = await communicationService.get(`/posts/${id}`)
    if (type === 'workout') post = await communicationService.get(`/workouts/${id}`)

    dispatch({ type: 'INIT_CURRENT_POST', data: post })
  }
}

export default currentPostReducer