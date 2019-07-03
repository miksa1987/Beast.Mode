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
import DoWorkout from './components/DoWorkout'

const usr = {
  username: 'Miksa',
  info: 'Just crazy guy from finland',
  id: '42536125',
  weight: '66',
  height: '171',
  picture: 'img/user.jpg'
}

const App = (props) => {
  useEffect(() => {
    const rawUser = window.localStorage.getItem('currentUser')
    const savedUser = JSON.parse(rawUser)
    if(savedUser) {
      props.setUser(savedUser)
    }
  }, [])

  if(props.currentUser === null) {
    return ( <div>
      <LoginForm />
    </div> )
  }

  return ( <div>
    <Router>
    <Route exact path='/' render={() => <Feed />} />
    <Route exact path='/workouts' render={() => <Workouts />} />
    <Route exact path='/dash' render={() => <Dashboard user={usr}/>} />
    <Route exact path='/settings' render={() => <Settings />} />
    <Route path='/profile/:id' render={() => <Dashboard user={usr} />} />
    <Route path='/doworkout/:id' render={ ({ match }) => <DoWorkout workoutid={match.params.id} /> } />
    <Menubar />
    </Router> 
  </div> )
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps, { setUser })(App)
