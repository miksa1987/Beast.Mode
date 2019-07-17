import React, { useState, useEffect } from 'react'
import { Segment, Input, Menu, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../reducers/currentUser'
import useWindowSize from '../hooks/useWindowSize'

const Menubar = (props) => {
  const windowSize = useWindowSize()

  const menuStyle = {
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    position: 'fixed',
    top: '0px',
    left: '0px',
    backgroundColor: '#dd0000'
  }

  const barStyle = {
    width: (windowSize.width - 6*55 - 40)
  }

  const itemStyle0 = {
    position: 'fixed',
    right: '4px',
    top: '10px',
    padding: '5px 10px 0px',
    backgroundColor: 'white'
  }

  const logout = () => {
    props.history.push('/')
    props.logoutUser()
  }

  const scrollToTop = () => window.scrollTo(0, 0)

  return ( <div style={menuStyle}>
    <Menu inverted color='red'>
      <Menu.Item onClick={() => props.history.push('/')}>
        <Icon name='home' />
      </Menu.Item>
      <Menu.Item onClick={() => props.history.push('/workouts')}>
        <Icon name='hand rock' />
      </Menu.Item>
      <Menu.Item onClick={() => props.history.push('/users')}>
        <Icon name='user circle' />
      </Menu.Item>
      <Menu.Item onClick={() => props.history.push('/dash')}>
        <Icon name='id card' />
      </Menu.Item>
      <Menu.Item >
        <Input style={barStyle} />
      </Menu.Item>
      <Menu.Item onClick={() => props.history.push('/settings')}>
        <Icon name='settings' />
      </Menu.Item>
      <Menu.Item onClick={logout}>
        <Icon name='log out' />
      </Menu.Item>
    </Menu>
  </div>)
}

export default connect(null, { logoutUser })(withRouter(Menubar))