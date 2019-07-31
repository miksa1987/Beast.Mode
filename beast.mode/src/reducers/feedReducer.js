import communicationService from '../service/communication'
import sorterService from '../service/sorter'
import moment from 'moment'

const initialState = {
  feed: [],
  loadedUntil: 0,
  loading: false
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
    default:
      return state
  }
}

export const initFeed = () => {
  return async dispatch => {
    const dateString = moment().format('YYYY-M-D-H-m')
    console.log(dateString)
    
    const posts = await communicationService.get(`/posts/byfriends/${dateString}`)
    const doneworkouts = await communicationService.get(`/doneworkouts/byfriends/${dateString}`)
    console.log(posts)
    console.log(new Date(posts.enddate).getHours())
    const feedPosts = posts.posts.concat(doneworkouts.doneworkouts).sort(sorterService.comparePostDates)
    dispatch({ type: 'SET_LOADED_UNTIL_TO', data: posts.startdate})
    dispatch({ type: 'INIT_FEED', data: feedPosts })
  }
}

export const loadMorePosts = () => {
  return async (dispatch, getState) => {
    let dateString = moment(getState().feed.loadedUntil).format('YYYY-M-D-h-m')
    dispatch({ type: 'SET_LOADING_TO', data: true })

    let posts = await communicationService.get(`/posts/byfriends/${dateString}`)
    let doneworkouts = await communicationService.get(`/doneworkouts/byfriends/${dateString}`)
    let feedPosts = posts.posts.concat(doneworkouts.doneworkouts).sort(sorterService.comparePostDates)

    while (feedPosts.length === 0) {
      dateString = moment(dateString, 'YYYY-M-D-h-m').add(-15, 'hours').format('YYYY-M-D-h-m')
      console.log(`load ${dateString}`)
      posts = await communicationService.get(`/posts/byfriends/${dateString}`)
      doneworkouts = await communicationService.get(`/doneworkouts/byfriends/${dateString}`)
      feedPosts = posts.posts.concat(doneworkouts.doneworkouts).sort(sorterService.comparePostDates)
    } 

    dispatch({ type: 'SET_LOADING_TO', data: false })

    console.log(feedPosts)
    dispatch({ type: 'SET_LOADED_UNTIL_TO', data: posts.startdate})
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