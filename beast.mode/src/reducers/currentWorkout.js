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
    case 'SET_CURRENT_WORKOUT_DONE':
      return { ...state, done: true, posted: true }
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

export const setCurrentWorkoutExerciseDone = (reps, exercise, set) => {
  return (dispatch, getState) => {
    let exercises = getState().currentWorkout.exercises
    if (!set) {
      exercises[exercise].done = true
      exercises[exercise].doneReps = reps
    } else {
      exercises[exercise][set].done = true
      exercises[exercise][set].doneReps = reps
    }
    dispatch({ type: 'SET_CURRENT_WORKOUT_EXERCISES', data: exercises })
  }
}

export const setCurrentWorkoutExerciseUndone = (exercise, set) => {
  return (dispatch, getState) => {
    let exercises = getState().currentWorkout.exercises
    if (!set) {
      exercises[exercise].done = false
      exercises[exercise].doneReps = 0
    } else {
      exercises[exercise][set].done = false
      exercises[exercise][set].doneReps = 0
    }
    dispatch({ type: 'SET_CURRENT_WORKOUT_EXERCISES', data: exercises })
  }
}

export const setCurrentWorkoutTime = (time, visible) => {
  return dispatch => dispatch({ type: 'SET_CURRENT_WORKOUT_TIME', data: { time, visible } })
}

export const setCurrentWorkoutDone = (time) => {
  return async (dispatch, getState) => {
    console.log(getState().currentWorkout)
    const doneWorkout = {
      content: getState().currentWorkout.textcontent,
      additional: '',
      picture: '',
      time
    }
    await communicationService.post('/doneworkouts/new', doneWorkout)
    dispatch({ type: 'SET_CURRENT_WORKOUT_DONE' })
  }
}

export default currentWorkoutReducer