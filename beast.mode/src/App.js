import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css'

import { setUser } from './reducers/currentUser'

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
    const rawUser = window.localStorage.getItem('currentUser')
    const savedUser = JSON.parse(rawUser)
    if(savedUser) {
      props.setUser(savedUser)
    }
  }, [])

  if(props.currentUser === null) {
    window.history.pushState('login', 'Login', '/login') // Maybe better to use this than fool around with withRouter and Router?
  }

  return ( <div>
    <Router>
    <Route exact path='/login' render={() => <LoginForm />} />
    <Route exact path='/newuser' render={() => <NewUser />} />
    <Route exact path='/' render={() => <Feed />} />
    <Route exact path='/workouts' render={() => <Workouts />} />
    <Route exact path='/dash' render={() => <Dashboard user={props.currentUser}/>} />
    <Route exact path='/settings' render={() => <Settings />} />
    <Route exact path='/profile/:id' render={() => <Dashboard user={props.currentUser} />} />
    <Route exact path='/doworkout/:id' render={ ({ match }) => <DoWorkout workoutid={match.params.id} /> } />
    {props.currentUser ? <Menubar /> : null }
    </Router> 
  </div> )
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps, { setUser })(App)
