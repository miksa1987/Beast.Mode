import communicationService from '../service/communication'
import sorterService from '../service/sorter'

const currentUserPostsReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_USER_POSTS':
      return action.data
    default:
      return state
  }
}

export const initUserPosts = (userid) => {
  return async dispatch => {
    console.log('in the reducer')
    console.log(userid)
    const usersPosts = await communicationService.get(`/users/${userid}/posts`)
    console.log(usersPosts)
    const usersWorkouts = await communicationService.get(`/users/${userid}/workouts`)
    console.log(usersWorkouts)
    const everything = usersPosts.concat(usersWorkouts)
    console.log(everything)

    everything.sort(sorterService.comparePostDates)
    dispatch({ type: 'INIT_USER_POSTS', data: everything })
  }
} 

export default currentUserPostsReducer