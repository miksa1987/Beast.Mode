import communicationService from '../service/communication'

const compare = (a, b) => {
  const date0 = new Date(a.date)
  const date1 = new Date(b.date)
  const d0 = date0.getFullYear() 
    + date0.getMonth() 
    + date0.getDate() 
    + date0.getHours() 
    + date0.getMinutes() 
    + date0.getSeconds() 
    + date0.getMilliseconds()
  const d1 = date1.getFullYear() 
    + date1.getMonth() 
    + date1.getDate() 
    + date1.getHours() 
    + date1.getMinutes() 
    + date1.getSeconds() 
    + date1.getMilliseconds()
  
  return d1 - d0
}

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

export const initFeed = (friends, myID) => {
  return async dispatch => {
    let feedPosts = await communicationService.get(`/users/${myID}/posts`)
    feedPosts = feedPosts.concat(await communicationService.get(`/users/${myID}/workouts`))

    for(let friend of friends) {
      const friendsPosts = await communicationService.get(`/users/${friend}/posts`)
      feedPosts = feedPosts.concat(friendsPosts)
      const friendsWorkouts = await communicationService.get(`/users/${friend}/workouts`)
      feedPosts = feedPosts.concat(friendsWorkouts)
    }
    console.log(feedPosts)
    feedPosts.sort(compare)

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