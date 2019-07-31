import communicationService from '../service/communication'
import sorterService from '../service/sorter'

const initialState = {
  feed: [],
  loadedUntil: 0
}

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
    const myDoneWorkouts = await communicationService.get(`/users/${myID}/doneworkouts`)
    feedPosts = feedPosts.concat(myDoneWorkouts)

    for(let friend of friends) {
      const friendsPosts = await communicationService.get(`/users/${friend}/posts`)
      const friendsDoneWorkouts = await communicationService.get(`/users/${friend}/doneworkouts`)
      feedPosts = feedPosts.concat(friendsPosts).concat(friendsDoneWorkouts)
    }
    feedPosts.sort(sorterService.comparePostDates)

    dispatch({ type: 'INIT_FEED', data: feedPosts })
  }
}

export const addToFeed = (post) => {
  return async dispatch => dispatch({ type: 'ADD_TOFEED', data: post })
}

export const removeFromFeed = (post) => {
  return async dispatch => {
    if(post.type === 'post') {
      communicationService.destroy(`/posts/${post._id}`)
    }
    if(post.type === 'doneworkout') {
      communicationService.destroy(`/doneworkouts/${post._id}`)
    }

    dispatch({ type: 'REMOVE_FROMFEED', data: { id: post._id } })
  }
}

export const addComment = (type, id, comment) => {
  return async dispatch => {
    const updatedPost = type === 'post' ? await communicationService.post(`/posts/${id}/comment`, { comment })
      : type === 'doneworkout' && await communicationService.post(`/doneworkouts/${id}/comment`, { comment })
    console.log(updatedPost)
    dispatch({ type: 'EDIT_POST_ON_FEED', data: updatedPost })
  }
}

export const like = (type, id) => {
  return async dispatch => {
    const updatedPost = type === 'post' ? await communicationService.post(`/posts/${id}/like`, { wee: 'wee' })
      : type === 'doneworkout' && await communicationService.post(`/doneworkouts/${id}/like`, { wee: 'wee' })
    console.log(updatedPost)
    dispatch({ type: 'EDIT_POST_ON_FEED', data: updatedPost })
  }
}

export default feedReducer