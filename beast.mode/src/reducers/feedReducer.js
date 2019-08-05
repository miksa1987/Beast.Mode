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
      return {...state, feed: state.feed.filter(p => p._id !== action.data._id) }
    case 'EDIT_POST_ON_FEED':
      return { ...state, feed: state.feed.map(post => post._id === action.data._id ? action.data : post) }
    case 'SET_LOADING_TO':
      return { ...state, loading: action.data }
    case 'SET_LOADED_UNTIL_TO':
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
    let dateString = moment().add(15, 'minutes').format('YYYY-M-D-H-m')
    
    const user = getState().currentUser
    console.log(user)
    if (user.friends.length === 0 && user.posts.length === 0 && user.doneworkouts.length === 0) {
      dispatch({ type: 'SET_LOADED_UNTIL_TO', data: getState().feed.endDate})
      dispatch({ type: 'SET_FEED_END', data: true })
      dispatch({ type: 'SET_LOADING_TO', data: false })
      return
    }

    let feedPosts = []
    let startdate = 0

    dispatch({ type: 'SET_LOADING_TO', data: true })
    while (feedPosts.length === 0) {
      const friendPosts = await communicationService.get(`/posts/byfriends/${dateString}`)
      const friendDoneworkouts = await communicationService.get(`/doneworkouts/byfriends/${dateString}`)
      const myPosts = await communicationService.get(`/users/${user.id}/posts/${dateString}`)
      const myDoneworkouts = await communicationService.get(`/users/${user.id}/doneworkouts/${dateString}`)

      feedPosts = feedPosts
      .concat(friendPosts.posts)
      .concat(friendDoneworkouts.doneworkouts)
      .concat(myPosts.posts)
      .concat(myDoneworkouts.doneworkouts)
      .sort(sorterService.comparePostDates)

      dateString = moment(dateString, 'YYYY-M-D-H-m').add(-12, 'hours').format('YYYY-M-D-H-m')

      startdate = myPosts.startdate

      if (friendPosts.end && friendDoneworkouts.end && myPosts.end && myDoneworkouts.end) {
        dispatch({ type: 'SET_FEED_END', data: true })
        console.log('feed end')
        break
      }
    }   

    dispatch({ type: 'SET_LOADING_TO', data: false })
    dispatch({ type: 'SET_LOADED_UNTIL_TO', data: startdate})
    dispatch({ type: 'INIT_FEED', data: feedPosts })
  }
}

export const loadMorePosts = () => {
  return async (dispatch, getState) => {
    let dateString = getState().feed.loadedUntil
    
    const user = getState().currentUser
    
    if (user.friends.length === 0 && user.posts.length === 0 && user.doneworkouts.length === 0) {
      dispatch({ type: 'SET_LOADED_UNTIL_TO', data: getState().feed.endDate})
      return
    }

    let startdate = 0

    let feedPosts = []
    dispatch({ type: 'SET_LOADING_TO', data: true })
    
    while (feedPosts.length === 0) {
      if(moment(dateString, 'YYYY-M-D-H-m').isBefore(moment(getState().feed.endDate, 'YYYY-M-D-H-m'))) break

      const friendPosts = await communicationService.get(`/posts/byfriends/${dateString}`)
      const friendDoneworkouts = await communicationService.get(`/doneworkouts/byfriends/${dateString}`)
      const myPosts = await communicationService.get(`/users/${user.id}/posts/${dateString}`)
      const myDoneworkouts = await communicationService.get(`/users/${user.id}/doneworkouts/${dateString}`)

      feedPosts = feedPosts
      .concat(friendPosts.posts)
      .concat(friendDoneworkouts.doneworkouts)
      .concat(myPosts.posts)
      .concat(myDoneworkouts.doneworkouts)
      .sort(sorterService.comparePostDates)

      dateString = moment(dateString, 'YYYY-M-D-H-m').add(-24, 'hours').format('YYYY-M-D-H-m')
      startdate = myPosts.startdate

      if (friendPosts.end && friendDoneworkouts.end && myPosts.end && myDoneworkouts.end) {
        dispatch({ type: 'SET_FEED_END', data: true })
        console.log('feed end')
        break
      }
    } 

    dispatch({ type: 'SET_LOADING_TO', data: false })
    dispatch({ type: 'SET_LOADED_UNTIL_TO', data:startdate})
    dispatch({ type: 'ADD_TOFEED', data: feedPosts })
  }
}

export const addNewToFeed = (post) => {
  return async dispatch => {
    console.log(post)
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

    dispatch({ type: 'REMOVE_FROMFEED', data: { id: post._id } })
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