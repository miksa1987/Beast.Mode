import communicationService from '../service/communication'

const workoutsReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_WORKOUTS':
    return action.data
  case 'ADD_WORKOUT':
    return [ ...state, action.data ]
  case 'EMPTY_WORKOUTS':
    return []
  default:
    return state
  }
}

export const initAllWorkouts = () => {
  return async dispatch => {
    const workouts = await communicationService.get('/workouts/all')
    return dispatch({ type: 'INIT_WORKOUTS', data: workouts })
  }
}

export const initWorkouts = (id) => {
  return async dispatch => {
    const workouts = await communicationService.get(`/users/${id}/workouts`)
    return dispatch({ type: 'INIT_WORKOUTS', data: workouts })
  }
}

export const initNewestWorkouts = () => {
  return async dispatch => {
    const workouts = await communicationService.get(`/workouts/newest`)
    return dispatch({ type: 'INIT_WORKOUTS', data: workouts })
  }
}

export const initRandomWorkouts = () => {
  return async dispatch => {
    const workouts = await communicationService.get(`/workouts/random`)
    return dispatch({ type: 'INIT_WORKOUTS', data: workouts })
  }
}

export const initFriendWorkouts = () => {
  return async dispatch => {
    const workouts = await communicationService.get(`/workouts/byfriends`)
    return dispatch({ type: 'INIT_WORKOUTS', data: workouts })
  }
}

export const initMostLikedWorkouts = () => {
  return async dispatch => {
    const workouts = await communicationService.get(`/workouts/mostliked`)
    return dispatch({ type: 'INIT_WORKOUTS', data: workouts })
  }
}

export const addWorkout = ( workout ) => {
  return dispatch => dispatch({ type: 'ADD_WORKOUT', data: workout })
}

export default workoutsReducer