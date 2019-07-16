import communicationService from '../service/communication'

const doneWorkoutReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_DONE_WORKOUTS':
      return action.data
    case 'ADD_DONE_WORKOUT':
      return [ ...state, action.data ]
    default:
      return state
  }
}

export const initDoneWorkouts = (id) => {
  return async dispatch => {
    const doneWorkouts = await communicationService.get(`/users/${id}/doneworkouts`)
    dispatch({ type: 'INIT_DONE_WORKOUTS', data: doneWorkouts })
  }
}

export const addDoneWorkout = (doneWorkout) => {
  return async dispatch => {
    const savedDoneWorkout = await communicationService.post('/doneworkouts/new', doneWorkout)
    dispatch({ type: 'ADD_DONE_WORKOUT', data: savedDoneWorkout })
  }
} 

export default doneWorkoutReducer