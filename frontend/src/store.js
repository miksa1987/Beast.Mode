import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import currentUserReducer from './reducers/currentUser'
import feedReducer from './reducers/feedReducer'
import workoutsReducer from './reducers/workoutsReducer'
import usersReducer from './reducers/usersReducer'
import doneWorkoutsReducer from './reducers/doneWorkoutsReducer'
import currentUserPostsReducer from './reducers/currentUserPosts'
import currentWorkoutReducer from './reducers/currentWorkout'
import currentProfileReducer from './reducers/currentProfile'
import currentPostReducer from './reducers/currentPost'
import notificationReducer from './reducers/notificationReducer'
import searchResultsReducer from './reducers/searchResultsReducer'

const reducer = combineReducers({
  currentUser: currentUserReducer,
  currentUserPosts: currentUserPostsReducer,
  currentWorkout: currentWorkoutReducer,
  currentProfile: currentProfileReducer,
  currentPost: currentPostReducer,
  users: usersReducer,
  feed: feedReducer,
  workouts: workoutsReducer,
  doneWorkouts: doneWorkoutsReducer,
  notification: notificationReducer,
  search: searchResultsReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store