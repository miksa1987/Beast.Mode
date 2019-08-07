import communicationService from '../service/communication'
import parser from '../service/parser'

const emptyWorkout = {
  id: '',
  type: null,
  exercises: [],
  time: {
    time: 0,
    visible: false
  },
  textcontent: '',
  done: false,
  comments: [],
  likes: [],
  picture: ''
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
      case 'COMMENT_WORKOUT':
        return action.data
      case 'LIKE_WORKOUT':
        return action.data
    default:
      return state
  }
}

export const initCurrentWorkout = (workoutid) => {
  return async dispatch => {
    const rawWorkout = await communicationService.get(`/workouts/${workoutid}`)
    const workout = parser.doWorkout(rawWorkout.content)
    dispatch({ type: 'INIT_CURRENT_WORKOUT', data: {
      ...workout, 
      id: rawWorkout._id,
      picture: rawWorkout.picture, 
      comments: rawWorkout.comments,
      likes: rawWorkout.likes
    } })
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

export const setCurrentWorkoutDone = (doneWorkout) => {
  return async dispatch => {
    console.log('send done workout')
    const savedDoneWorkout = await communicationService.post('/doneworkouts/new', doneWorkout)
    dispatch({ type: 'ADD_NEW_TO_FEED', data: savedDoneWorkout})
    dispatch({ type: 'SET_CURRENT_WORKOUT_DONE' })
  }
}

export const commentWorkout = (comment, id) => {
  return async dispatch => {
    const updatedWorkout = await communicationService.post(`/workouts/${id}/comment`, { comment })
    const workout = parser.doWorkout(updatedWorkout.content)
    dispatch({ type: 'COMMENT_WORKOUT', data: {
      ...workout, 
      id: updatedWorkout._id,
      picture: updatedWorkout.picture, 
      comments: updatedWorkout.comments,
      likes: updatedWorkout.likes
    } })
  }
}

export const likeWorkout = (placeholder, id) => {
  return async dispatch => {
    const updatedWorkout = await communicationService.post(`/workouts/${id}/like`, { wee: 'wee' })
    const workout = parser.doWorkout(updatedWorkout.content)
    dispatch({ type: 'LIKE_WORKOUT', data: {
      ...workout, 
      id: updatedWorkout._id,
      picture: updatedWorkout.picture, 
      comments: updatedWorkout.comments,
      likes: updatedWorkout.likes
    } })
  }
}

export default currentWorkoutReducer