import communicationService from '../service/communication'
import sorterService from '../service/sorter'

const feedReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_FEED':
      return action.data
    case 'ADD_TOFEED':
      return [ ...state, action.data ]
    case 'REMOVE_FROMFEED':
      return state.filter(p => p._id !== action.data._id)
    case 'EDIT_POST_ON_FEED':
      return state.map(post => post._id === action.data._id ? action.data : post)
    default:
      return state
  }
}

export const initFeed = (friends, myID) => {
  return async dispatch => {
    let feedPosts = await communicationService.get(`/users/${myID}/posts`)

    for(let friend of friends) {
      const friendsPosts = await communicationService.get(`/users/${friend}/posts`)
      feedPosts = feedPosts.concat(friendsPosts)
    }
    feedPosts.sort(sorterService.comparePostDates)

    console.log(feedPosts)
    dispatch({ type: 'INIT_FEED', data: feedPosts })
  }
}

export const addToFeed = (post) => {
  return async dispatch => dispatch({ type: 'ADD_TOFEED', data: post })
}

export const removeFromFeed = (post) => {
  return async dispatch => {
    if(post.type === 'post') {
      communicationService.delete(`/posts/${post._id}`)
    }
    if(post.type === 'workout') {
      communicationService.delete(`/workouts/${post._id}`)
    }

    dispatch({ type: 'REMOVE_FROMFEED', data: { id: post._id } })
  }
}

export const addComment = (type, id, comment) => {
  return async dispatch => {
    const updatedPost = type === 'post' ? await communicationService.post(`/posts/${id}/comment`, { comment })
      : type === 'workout' && await communicationService.post(`/workouts/${id}/comment`, { comment })
    console.log(updatedPost)
    dispatch({ type: 'EDIT_POST_ON_FEED', data: updatedPost })
  }
}

export const like = (type, id) => {
  return async dispatch => {
    const updatedPost = type === 'post' ? await communicationService.post(`/posts/${id}/like`, { wee: 'wee' })
      : type === 'workout' && await communicationService.post(`/workouts/${id}/like`, { wee: 'wee' })
    console.log(updatedPost)
    dispatch({ type: 'EDIT_POST_ON_FEED', data: updatedPost })
  }
}

export default feedReducer