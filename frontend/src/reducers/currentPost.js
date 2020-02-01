import communicationService from '../service/communication'

const currentPostReducer = (state = {}, action) => {
  switch (action.type) {
  case 'LOAD_CURRENT_POST':
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
    if (type === 'doneworkout') post = await communicationService.get(`/doneworkouts/${id}`)

    dispatch({ type: 'LOAD_CURRENT_POST', data: post })
  }
}

export const commentCurrentPost = (type, id, comment) => {
  return async dispatch => {
    let post = {}

    if (type === 'post') post = await communicationService.post(`/posts/${id}/comment`, { comment })
    if (type === 'workout') post = await communicationService.post(`/workouts/${id}/comment`, { comment })
    if (type === 'doneworkout') post = await communicationService.post(`/doneworkouts/${id}/comment`, { comment })

    dispatch({ type: 'LOAD_CURRENT_POST', data: post })
  }
}

export const likeCurrentPost = (type, id) => {
  return async dispatch => {
    let post = {}

    if (type === 'post') post = await communicationService.post(`/posts/${id}/like`, { wee: 'wee' })
    if (type === 'workout') post = await communicationService.post(`/workouts/${id}/like`, { wee: 'wee' })
    if (type === 'doneworkout') post = await communicationService.post(`/doneworkouts/${id}/like`, { wee: 'wee' })

    dispatch({ type: 'LOAD_CURRENT_POST', data: post })
  }
}

export default currentPostReducer