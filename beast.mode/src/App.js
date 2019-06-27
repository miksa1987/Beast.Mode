import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

import Menubar from './components/Menubar'
import Feed from './components/Feed'
import Workouts from './components/Workouts'
import Dashboard from './components/Dashboard'
import Settings from './components/Settings'

const usr = {
  username: 'Miksa',
  info: 'Just crazy guy from finland',
  id: '42536125',
  weight: '66',
  height: '171',
  picture: 'img/user.jpg'
}

const App = (props) => {
  return ( <div>
    <Router>
    <Route exact path='/' render={() => <Feed />} />
    <Route exact path='/workouts' render={() => <Workouts />} />
    <Route exact path='/dash' render={() => <Dashboard user={usr}/>} />
    <Route exact path='/settings' render={() => <Settings />} />
    <Route path='profile/:id' render={() => <Dashboard user={usr} />} />
    <Menubar />
    </Router> 
  </div> )
}

export default App
