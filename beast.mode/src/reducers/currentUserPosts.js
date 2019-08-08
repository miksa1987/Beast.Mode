import communicationService from '../service/communication'
import sorterService from '../service/sorter'

const currentUserPostsReducer = (state = [], action) => {
  switch(action.type) {
    case 'EMPTY_CURRENTUSER_POSTS':
      return []
    case 'INIT_USER_POSTS':
      return action.data
    default:
      return state
  }
}

export const initUserPosts = (userid) => {
  return async dispatch => {
    dispatch({ type: 'EMPTY_CURRENTUSER_POSTS' })
    console.log('in the reducer')
    console.log(userid)
    const usersPosts = await communicationService.get(`/users/${userid}/posts`)

    usersPosts.sort(sorterService.comparePostDates)
    dispatch({ type: 'INIT_USER_POSTS', data: usersPosts })
  }
} 

export default currentUserPostsReducer