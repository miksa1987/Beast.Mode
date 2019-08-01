import communicationService from '../service/communication'
import sorterService from '../service/sorter'
import moment from 'moment'

const initialState = {
  feed: [],
  loadedUntil: 0,
  loading: false,
  endDate: 0
}

const feedReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INIT_FEED':
      return { ...state, feed: action.data }
    case 'ADD_NEW_TO_FEED':
      return { ...state, feed: action.data.concat(state.feed) }
    case 'ADD_TOFEED':
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
    default:
      return state
  }
}

export const initFeed = () => {
  return async (dispatch, getState) => {
    let dateString = moment().format('YYYY-M-D-H-m')
    const user = getState().currentUser.id
    let feedPosts = []
    let startdate = 0

    while (feedPosts.length === 0) {
      console.log(dateString)
      console.log(feedPosts)
      const friendPosts = await communicationService.get(`/posts/byfriends/${dateString}`)
      console.log(friendPosts.posts)
      const friendDoneworkouts = await communicationService.get(`/doneworkouts/byfriends/${dateString}`)
      console.log(friendDoneworkouts.doneworkouts)
      const myPosts = await communicationService.get(`/users/${user}/posts/${dateString}`)
      console.log(myPosts.posts)
      const myDoneworkouts = await communicationService.get(`/users/${user}/doneworkouts/${dateString}`)
      console.log(myDoneworkouts.doneworkouts)

      feedPosts = feedPosts
      .concat(friendPosts.posts)
      .concat(friendDoneworkouts.doneworkouts)
      .concat(myPosts.posts)
      .concat(myDoneworkouts.doneworkouts)
      .sort(sorterService.comparePostDates)

      console.log(feedPosts)
      dateString = moment(dateString, 'YYYY-M-D-h-m').add(-12, 'hours').format('YYYY-M-D-h-m')

      startdate = myPosts.startdate
      console.log(startdate)
      console.log(getState().feed.loadedUntil)
    }   

    dispatch({ type: 'SET_LOADED_UNTIL_TO', data: startdate})
    dispatch({ type: 'INIT_FEED', data: feedPosts })
  }
}

export const loadMorePosts = () => {
  return async (dispatch, getState) => {
    let dateString = getState().feed.loadedUntil
    
    console.log(getState().feed.loadedUntil)
    const user = getState().currentUser.id
    let startdate = 0

    let feedPosts = []
    dispatch({ type: 'SET_LOADING_TO', data: true })
    
    while (feedPosts.length === 0) {
      if(moment(dateString, 'YYYY-M-D-h-m').isBefore(moment(getState().feed.endDate, 'YYYY-M-D-h-m'))) break

      const friendPosts = await communicationService.get(`/posts/byfriends/${dateString}`)
      const friendDoneworkouts = await communicationService.get(`/doneworkouts/byfriends/${dateString}`)
      const myPosts = await communicationService.get(`/users/${user}/posts/${dateString}`)
      const myDoneworkouts = await communicationService.get(`/users/${user}/doneworkouts/${dateString}`)

      feedPosts = feedPosts
      .concat(friendPosts.posts)
      .concat(friendDoneworkouts.doneworkouts)
      .concat(myPosts.posts)
      .concat(myDoneworkouts.doneworkouts)
      .sort(sorterService.comparePostDates)

      
      dateString = moment(dateString, 'YYYY-M-D-h-m').add(-12, 'hours').format('YYYY-M-D-h-m')
      startdate = myPosts.startdate
      console.log(getState().feed.loadedUntil)
    } 

    dispatch({ type: 'SET_LOADING_TO', data: false })

    console.log(feedPosts)
    dispatch({ type: 'SET_LOADED_UNTIL_TO', data:startdate})
    dispatch({ type: 'ADD_TOFEED', data: feedPosts })
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

export const setEndDate = () => {
  return async dispatch => {
    const post = await communicationService.get('/posts/oldest')
    const doneworkout = await communicationService.get('/doneworkouts/oldest')

    if (moment(post.oldest, 'YYYY-M-D-h-m').isBefore(moment(doneworkout.oldest, 'YYYY-M-D-h-m'))) {
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