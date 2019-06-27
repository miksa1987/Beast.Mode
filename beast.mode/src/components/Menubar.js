import React from 'react'
import { Link } from 'react-router-dom'

import './Menubar.css'

const Menubar = (props) => {
  const menuStyle = {
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    position: 'fixed',
    top: '0px',
    left: '0px',
    color: '#ffffff'
  }

  const searchStyle = {
    paddingTop: '0px',
    width: '40%',
    minWidth: '40%',
    maxWidth: 'auto',
  }
  return ( <div style={menuStyle}>
    <div>
    <Link to='/'>
      <img src='/img/feed.jpg' alt='feed' />
    </Link>
    <Link to='/workouts'>
      <img src='/img/wrkouts.jpg' alt='workouts' />
    </Link>
    <Link to='/dash'>
      <img src='/img/dash.jpg' alt='dashboard' />
    </Link>
    <input style={searchStyle} name='search' />
    <Link to='/settings'>
      <img src='/img/settings.jpg' alt='settings' />
    </Link>
    </div>
  </div>)
}

export default Menubar