import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css'

import { setUser } from './reducers/currentUser'
import userHelper from './util/userHelper'
import communicationService from './service/communication'

import Menubar from './components/Menubar'
import Feed from './components/Feed'
import Workouts from './components/Workouts'
import Dashboard from './components/Dashboard'
import Settings from './components/Settings'
import LoginForm from './components/LoginForm'
import NewUser from './components/NewUser'
import DoWorkout from './components/DoWorkout'

const App = (props) => {
  useEffect(() => {
    userHelper.checkAndSetUser(props.setUser)
  }, [])

  if(props.currentUser === null) {
    return ( <div>
      <LoginForm />
    </div>)
  }

  return ( <div>
    <Router>
    <Route exact path='/newuser' render={() => <NewUser />} />
    <Route exact path='/' render={() => <Feed />} />
    <Route exact path='/workouts' render={() => <Workouts />} />
    <Route exact path='/dash' render={() => <Dashboard user={props.currentUser}/>} />
    <Route exact path='/settings' render={() => <Settings />} />
    <Route exact path='/profile/:id' render={({ match }) => <Dashboard user={match.params.id} />} />
    <Route exact path='/doworkout/:id' render={ ({ match }) => <DoWorkout workoutid={match.params.id} /> } />
    {props.currentUser ? <Menubar /> : null }
    </Router> 
  </div> )
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps, { setUser })(App)
