import communicationService from '../service/communication'
import sorterService from '../service/sorter'
import moment from 'moment'

const initialState = {
  feed: [],
  loadedUntil: 0,
  loading: true,
  endDate: 0,
  end: false
}

const feedReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'EMPTY_FEED':
    return initialState
  case 'INIT_FEED':
    return { ...state, feed: action.data }
  case 'ADD_NEW_TO_FEED':
    return { ...state, feed: [ action.data ].concat(state.feed) }
  case 'ADD_TOFEED':
    // I'll keep this here just in case it's needed
    return { ...state, feed: state.feed.concat(action.data) }
  case 'REMOVE_FROMFEED':
    return {...state, feed: state.feed.filter(p => p._id !== action.data) }
  case 'EDIT_POST_ON_FEED':
    return { ...state, feed: state.feed.map(post => post._id === action.data._id ? action.data : post) }
  case 'SET_FEED_LOADING_TO':
    return { ...state, loading: action.data }
  case 'SET_FEED_LOADED_UNTIL_TO':
    return { ...state, loadedUntil: action.data }
  case 'SET_FEED_END_DATE':
    return { ...state, endDate: action.data }
  case 'SET_FEED_END':
    return { ...state, end: action.data }
  default:
    return state
  }
}

export const emptyFeed = () => {
  return dispatch => {
    dispatch({ type: 'EMPTY_FEED' })
  }
}

export const initFeed = () => {
  return async (dispatch, getState) => {
    dispatch({ type: 'SET_FEED_LOADING_TO', data: true })
    
    const friendsDoneWorkouts = await communicationService.get('/doneworkouts/byfriends/skip/0')
    const friendsPosts = await communicationService.get('/posts/byfriends/skip/0')
    const myDoneworkouts = await communicationService.get(`/users/${getState().currentUser.id}/doneworkouts/skip/0`)
    const myPosts = await communicationService.get(`/users/${getState().currentUser.id}/posts/skip/0`)  

    const feedContent = [ 
      ...friendsDoneWorkouts.doneworkouts, 
      ...friendsPosts.posts, 
      ...myDoneworkouts.doneworkouts, 
      ...myPosts.posts 
    ] 

    dispatch({ type: 'SET_FEED_LOADING_TO', data: false })
    dispatch({ type: 'SET_FEED_LOADED_UNTIL_TO', data: 30})
    dispatch({ type: 'INIT_FEED', data: feedContent })
  }
}

export const loadMorePosts = () => {
  return async (dispatch, getState) => {
    dispatch({ type: 'SET_FEED_LOADING_TO', data: true })

    const loadedUntil = getState().feed.loadedUntil
    const friendsDoneWorkouts = await communicationService.get(`/doneworkouts/byfriends/skip/${loadedUntil}`)
    const friendsPosts = await communicationService.get(`/posts/byfriends/skip/${loadedUntil}`)
    const myDoneworkouts = await communicationService.get(`/users/${getState().currentUser.id}/doneworkouts/skip/${loadedUntil}`)
    const myPosts = await communicationService.get(`/users/${getState().currentUser.id}/posts/skip/${loadedUntil}`)  

    if (friendsPosts.end && friendsDoneWorkouts.end && myDoneworkouts.end && myPosts.end) {
      dispatch({ type: 'SET_FEED_END', data: true })
    }
    const feedContent = [ 
      ...friendsDoneWorkouts.doneworkouts, 
      ...friendsPosts.posts, 
      ...myDoneworkouts.doneworkouts, 
      ...myPosts.posts 
    ]

    dispatch({ type: 'SET_FEED_LOADING_TO', data: false })
    dispatch({ type: 'SET_FEED_LOADED_UNTIL_TO', data: getState().feed.loadedUntil + 30})
    dispatch({ type: 'ADD_TOFEED', data: feedContent })
  }
}

export const addNewToFeed = (post) => {
  return async dispatch => {
    const addedPost = post.type === 'post' ?
      await communicationService.post('/posts/new', post) : await communicationService.post('/doneworkouts/new', post)
    dispatch({ type: 'ADD_NEW_TO_FEED', data: addedPost })
  }
}

export const addToFeed = (post) => {
  return async dispatch => dispatch({ type: 'ADD_NEW_TO_FEED', data: post })
}

export const removeFromFeed = (post) => {
  return async dispatch => {
    if(post.type === 'post') {
      communicationService.destroy(`/posts/${post._id}`)
    }
    if(post.type === 'doneworkout') {
      communicationService.destroy(`/doneworkouts/${post._id}`)
    }

    dispatch({ type: 'REMOVE_FROMFEED', data: post._id })
  }
}

export const setEndDate = () => {
  return async dispatch => {
    const post = await communicationService.get('/posts/oldest')
    const doneworkout = await communicationService.get('/doneworkouts/oldest')

    if (moment(post.oldest, 'YYYY-M-D-H-m').isBefore(moment(doneworkout.oldest, 'YYYY-M-D-H-m'))) {
      dispatch({ type: 'SET_FEED_END_DATE', data: post.oldest })
    } else {
      dispatch({ type: 'SET_FEED_END_DATE', data: doneworkout.oldest })
    }
  }
}

export const addComment = (type, id, comment) => {
  return async dispatch => {
    const updatedPost = type === 'post' ? await communicationService.post(`/posts/${id}/comment`, { comment })
      : type === 'doneworkout' && await communicationService.post(`/doneworkouts/${id}/comment`, { comment })
    dispatch({ type: 'EDIT_POST_ON_FEED', data: updatedPost })
  }
}

export const like = (type, id) => {
  return async dispatch => {
    const updatedPost = type === 'post' ? await communicationService.post(`/posts/${id}/like`, { wee: 'wee' })
      : type === 'doneworkout' && await communicationService.post(`/doneworkouts/${id}/like`, { wee: 'wee' })
    dispatch({ type: 'EDIT_POST_ON_FEED', data: updatedPost })
  }
}

export default feedReducer