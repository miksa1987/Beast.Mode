import communicationService from '../service/communication'

const feedReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_FEED':
      return action.data
    case 'ADD_TOFEED':
      return [ ...state, action.data ]
    case 'REMOVE_FROMFEED':
      return state.filter(p => p.id !== action.data.id)
    case 'EDIT_POST_ONFEED':
      // TBD
      return state
    default:
      return state
  }
}

export const initFeed = (friends) => {
  return async dispatch => {
    let feedPosts = []

    for(let friend of friends) {
      const friendsPosts = await communicationService.get(`/users/${friend}/posts`)
      feedPosts = feedPosts.concat(friendsPosts)
      const friendsWorkouts = await communicationService.get(`/users/${friend}/workouts`)
      feedPosts = feedPosts.concat(friendsWorkouts)
    }
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

export default feedReducer