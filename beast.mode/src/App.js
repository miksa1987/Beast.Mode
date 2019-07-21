import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css'

import { setUser } from './reducers/currentUser'
import userHelper from './util/userHelper'
import socket from './service/socket'

import Menubar from './components/Menubar'
import Feed from './components/Feed'
import Workouts from './components/Workouts'
import Users from './components/Users'
import Dashboard from './components/profile/Dashboard'
import Settings from './components/Settings'
import LoginForm from './components/login/LoginForm'
import DoWorkout from './components/DoWorkout'
import Friends from './components/profile/Friends'
import Activity from './components/profile/Activity'
import Photos from './components/profile/Photos'
import UsersWorkouts from './components/profile/UsersWorkouts'
import UsersDoneWorkouts from './components/profile/UsersDoneWorkouts'
import Viewpost from './components/Viewpost'

const App = (props) => {
  useEffect(() => {
    userHelper.checkAndSetUser(props.setUser)
  }, [])

  if (props.currentUser === null) {
    return ( <div>
      <LoginForm />
    </div>)
  }

  if (props.currentUser.id) {
    socket.setUser(props.currentUser.id)
    socket.emitUser()
  }

  return ( <div>
    <Router>
    <Route exact path='/' render={() => <Feed />} />
    <Route exact path='/workouts' render={() => <Workouts />} />
    <Route exact path='/users' render={() => <Users />} />
    <Route exact path='/dash' render={() => <Dashboard user={props.currentUser.id}/>} />
    <Route exact path='/settings' render={() => <Settings />} />
    <Route exact path='/profile/:id' render={ ({ match }) => <Dashboard user={match.params.id} />} />
    <Route exact path='/profile/:id/friends' render={() => <Friends />} />
    <Route exact path='/profile/:id/activity' render={() => <Activity />} />
    <Route exact path='/profile/:id/photos' render={() => <Photos />} />
    <Route exact path='/profile/:id/workouts' render={() => <UsersWorkouts />} />
    <Route exact path='/profile/:id/doneworkouts' render={() => <UsersDoneWorkouts />} />
    <Route exact path='/post/:id/' render={ ({ match }) => <Viewpost type='post' id={match.params.id} />} />
    <Route exact path='/workout/:id/' render={ ({ match }) => <Viewpost type='workout' id={match.params.id} />} />
    <Route exact path='/doworkout/:id' render={ ({ match }) => <DoWorkout workoutid={match.params.id} /> } />
    {props.currentUser ? <Menubar /> : null }
    </Router> 
  </div> )
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps, { setUser })(App)
