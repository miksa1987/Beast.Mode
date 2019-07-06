import communicationService from '../service/communication'
import parser from '../service/parser'

const emptyWorkout = {
  type: null,
  exercises: [],
  time: {
    time: 0,
    visible: false
  },
  done: false
}

const currentWorkoutReducer = (state = emptyWorkout, action) => {
  switch(action.type) {
    case 'INIT_CURRENT_WORKOUT':
      return action.data
    case 'SET_CURRENT_WORKOUT_EXERCISES':
      return { ...state, exercises: action.data }
    case 'SET_CURRENT_WORKOUT_TIME':
      return { ...state, time: { time: action.data.time, visible: action.data.visible }}
    default:
      return state
  }
}

export const initCurrentWorkout = (workoutid) => {
  return async dispatch => {
    const rawWorkout = await communicationService.get(`/workouts/${workoutid}`)
    const workout = parser.doWorkout(rawWorkout.content)
    dispatch({ type: 'INIT_CURRENT_WORKOUT', data: workout })
  }
}

export const setCurrentWorkoutExercises = (exercises) => {
  return dispatch => dispatch({ type: 'SET_CURRENT_WORKOUT_EXERCISES', data: exercises })
}

export const setCurrentWorkoutExerciseDone = (exercise, set, reps) => {
  return (dispatch, getState) => {
    let exercises = getState().currentWorkout.exercises
    exercises[exercise][set].reps = reps
    exercises[exercise][set].done = true

    dispatch({ type: 'SET_CURRENT_WORKOUT_EXERCISES', data: exercises })
  }
}

export const setCurrentWorkoutTime = (time, visible) => {
  return dispatch => dispatch({ type: 'SET_CURRENT_WORKOUT_TIME', data: { time, visible } })
}

export default currentWorkoutReducer