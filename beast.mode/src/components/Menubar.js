import React from 'react'
import { Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../reducers/currentUser'

import './Menubar.css'

const Menubar = (props) => {
  const menuStyle = {
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    position: 'fixed',
    top: '0px',
    left: '0px',
    backgroundColor: '#ffffff'
  }

  const searchStyle = {
    margin: '0px 0px 0px 0px',
    align: 'top',
    width: '65%',
    minWidth: '40%',
    maxWidth: 'auto',
  }

  const itemStyle = {
    padding: '5px 10px 10px',
    backgroundColor: 'white'
  }

  const logout = () => {
    props.logoutUser()
  }

  return ( <div style={menuStyle}>
    <div><Segment>
    <Link to='/' style={itemStyle}>
      <img src='/img/ui/feed.png' alt='feed' />
    </Link>
    <Link to='/workouts' style={itemStyle}>
      <img src='/img/ui/wrkouts.png' alt='workouts' />
    </Link>
    <Link to='/dash' style={itemStyle}>
      <img src='/img//ui/dashboard.png' alt='dashboard' />
    </Link>
    <input style={searchStyle} name='search' />
    <Link to='/settings' style={itemStyle}>
      <img src='/img/ui/settings.png' alt='settings' />
    </Link>
    <Link to='/' onClick={logout} style={itemStyle}>
      <img src='/img/ui/logout.png' alt='logout' />
    </Link>
    </Segment></div>
  </div>)
}

export default connect(null, { logoutUser })(Menubar)