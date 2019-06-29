import axios from 'axios'

const feedReducer = (state = [], action) {
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
    const feedPosts = []
    friends.forEach(f => {
      const friendsPosts = await axios.get(`/users/${friend}/posts`)
      feedPosts = feedPosts.concat(friendsPosts)
      const friendsWorkouts = await axios.get(`/users/${friend}/workouts`)
      feedPosts = feedPosts.concat(friendsWorkouts)
    })

    dispatch({ type: 'INIT_FEED', data: feedPosts })
  }
}

export const addToFeed = (post) => {
  return async dispatch => {
    if(post.type === 'post') {
      await axios.post('/posts/add')
    }
    if(post.type === 'workout') {
      await axios.post('/workouts/add')
    }
    
    dispatch({ type: 'ADD_TOFEED', data: post })
  }
}

export const removeFromFeed = (id) => {
  return async dispatch => {
    if(post.type === 'post') {
      await axios.delete(`/posts/${id}`)
    }
    if(post.type === 'workout') {
      await axios.delete(`/workouts/${id}`)
    }

    dispatch({ type: 'REMOVE_FROMFEED', data: { id: id } })
  }
}