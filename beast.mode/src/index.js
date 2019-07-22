import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import './index.css'
import App from './App'
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
  searchResults: searchResultsReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

const renderApp = () => {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
}

store.subscribe(renderApp)
renderApp()