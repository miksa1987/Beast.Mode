import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'

import { setUser } from './reducers/currentUser'
import { setNotification } from './reducers/notificationReducer'
import userHelper from './util/userHelper'

import Menubar from './components/Menubar'
import Notification from './components/Notification'
import Feed from './components/Feed'
import Workouts from './components/workout/Workouts'
import Users from './components/Users'
import Dashboard from './components/profile/Dashboard'
import Settings from './components/Settings'
import LoginForm from './components/login/LoginForm'
import NewUser from './components/login/NewUser'
import SearchResults from './components/search/SearchResults'
import DoWorkout from './components/workout/workoutview/DoWorkout'
import Friends from './components/profile/Friends'
import Activity from './components/profile/Activity'
import Photos from './components/profile/Photos'
import UsersWorkouts from './components/profile/UsersWorkouts'
import UsersDoneWorkouts from './components/profile/UsersDoneWorkouts'
import Viewpost from './components/post/Viewpost'

const App = (props) => {
  useEffect(() => {
    userHelper.checkAndSetUser(props.setUser, props.setNotification)
  }, [])

  if (props.currentUser === null) {
    return ( <div>
      <Router>
        <Route exact path='/' render={() => <LoginForm />} />
        <Route exact path='/newuser' render={() => <NewUser />} />
      <Notification />
      </Router>
    </div>)
  }

  return ( <div>
    <Router>
      <Route exact path='/' render={() => <Feed />} />
      <Route exact path='/workouts' render={() => <Workouts />} />
      <Route exact path='/users' render={() => <Users />} />
      <Route exact path='/dash' render={() => <Dashboard user={props.currentUser.id}/>} />
      <Route exact path='/settings' render={() => <Settings />} />
      <Route exact path='/search' render={() => <SearchResults />} />

      <Route exact path='/profile/:id' render={ ({ match }) => <Dashboard user={match.params.id} view='posts' />} />
      <Route exact path='/profile/:id/posts' render={ ({ match }) => <Dashboard user={match.params.id} view='posts' />} />
      <Route exact path='/profile/:id/friends' render={({ match }) => <Dashboard user={match.params.id} view='friends' />} />
      <Route exact path='/profile/:id/activity' render={({ match }) => <Dashboard user={match.params.id} view='activity' />} />
      <Route exact path='/profile/:id/workouts' render={({ match }) => <Dashboard user={match.params.id} view='workouts' />} />
      <Route exact path='/profile/:id/doneworkouts' render={({ match }) => <Dashboard user={match.params.id} view='doneworkouts' />} />
    
      <Route exact path='/post/:id/' render={ ({ match }) => <Viewpost type='post' id={match.params.id} />} />
      <Route exact path='/workout/:id/' render={ ({ match }) => <Viewpost type='workout' id={match.params.id} />} />
      <Route exact path='/doworkout/:id' render={ ({ match }) => <DoWorkout workoutid={match.params.id} /> } />
    
      <Menubar />
      <Notification />
    </Router> 
  </div> )
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps, { setUser, setNotification })(App)
