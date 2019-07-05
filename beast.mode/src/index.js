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
import currentUserPostsReducer from './reducers/currentUserPosts'

const reducer = combineReducers({
  currentUser: currentUserReducer,
  currentUserPosts: currentUserPostsReducer,
  feed: feedReducer,
  workouts: workoutsReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

const renderApp = () => {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
}

store.subscribe(renderApp)
renderApp()