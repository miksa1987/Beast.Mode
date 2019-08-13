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
    case 'SET_CURRENT_WORKOUT':
      return action.data
    case 'SET_CURRENT_WORKOUT_EXERCISES':
      return { ...state, exercises: action.data }
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
    console.log(workout)
    dispatch({ type: 'SET_CURRENT_WORKOUT', data: {
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

export const setCurrentWorkoutDone = (doneWorkout) => {
  return async (dispatch, getState) => {
    const savedDoneWorkout = await communicationService.post('/doneworkouts/new', doneWorkout)
    dispatch({ type: 'ADD_NEW_TO_FEED', data: savedDoneWorkout})
    dispatch({ type: 'SET_CURRENT_WORKOUT_DONE' })

    const updatedActivity = getState().currentUser.activity
      .concat({ 
        text: `${getState().currentUser.username} did a workout`, 
        uri: `/doneworkout/${savedDoneWorkout._id}` 
      })
    const updatedUser = { ...getState().currentUser, activity: updatedActivity }
    dispatch({ type: 'SET_USER', data: updatedUser})
  }
}

export const commentWorkout = (comment, id) => {
  return async (dispatch, getState) => {
    const updatedWorkout = await communicationService.post(`/workouts/${id}/comment`, { comment })
    console.log(updatedWorkout.content)
    dispatch({ type: 'SET_CURRENT_WORKOUT', data: {
      ...getState().currentWorkout,  
      comments: updatedWorkout.comments || getState().currentWorkout.comments
    } })
  }
}

export const likeWorkout = (placeholder, id) => {
  return async (dispatch, getState) => {
    const updatedWorkout = await communicationService.post(`/workouts/${id}/like`, { wee: 'wee' })
    console.log(updatedWorkout)
    
    dispatch({ type: 'SET_CURRENT_WORKOUT', data: {
      ...getState().currentWorkout, 
      likes: updatedWorkout.likes || getState().currentWorkout.likes
    } })
  }
}

export default currentWorkoutReducer