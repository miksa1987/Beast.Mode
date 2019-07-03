import communicationService from '../service/communication'

const workoutsReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_WORKOUTS':
      return action.data
    case 'ADD_WORKOUT':
      return [ ...state, action.data ]
    case 'REMOVE_WORKOUT':
      // TBD
    default:
      return state
  }
}

export const initWorkouts = (workoutsLength) => {
  return async dispatch => {
    if(workoutsLength > 0) return
    
    const workouts = await communicationService.get('/workouts/all')
    return dispatch({ type: 'INIT_WORKOUTS', data: workouts })
  }
}

export const addWorkout = ( workout ) => {
  return dispatch => dispatch({ type: 'ADD_WORKOUT', data: workout })
}

export default workoutsReducer