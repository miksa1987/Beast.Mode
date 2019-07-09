import React from 'react'
import { Segment, Input } from 'semantic-ui-react'
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
    position: 'fixed',
    top: '15px',
    align: 'top',
    width: '50%',
    minWidth: '40%',
    maxWidth: 'auto',
  }

  const itemStyle = {
    padding: '5px 10px 10px',
    backgroundColor: 'white'
  }

  const itemStyle0 = {
    position: 'fixed',
    right: '4px',
    top: '10px',
    padding: '5px 10px 0px',
    backgroundColor: 'white'
  }

  const logout = () => {
    props.logoutUser()
  }

  const scrollToTop = () => window.scrollTo(0, 0)

  return ( <div style={menuStyle}>
    <div><Segment>
    <Link to='/' style={itemStyle} onClick={scrollToTop}>
      <img src='/img/ui/feed.png' alt='feed' />
    </Link>
    <Link to='/workouts' style={itemStyle} onClick={scrollToTop}>
      <img src='/img/ui/wrkouts.png' alt='workouts' />
    </Link>
    <Link to='/dash' style={itemStyle} onClick={scrollToTop}>
      <img src='/img//ui/dashboard.png' alt='dashboard' />
    </Link>
    <Input style={searchStyle} size='small' action={{ icon: 'search' }} name='search' />
    <div style={itemStyle0}>
    <Link to='/settings' style={itemStyle} onClick={scrollToTop}>
      <img src='/img/ui/settings.png' alt='settings' />
    </Link>
    <Link to='/' onClick={logout} style={itemStyle}>
      <img src='/img/ui/logout.png' alt='logout' />
    </Link>
    </div>
    </Segment></div>
  </div>)
}

export default connect(null, { logoutUser })(Menubar)