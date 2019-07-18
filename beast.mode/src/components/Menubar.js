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

  const home = () => {
    window.scrollTo(0, 0)
    props.history.push('/')
  }

  const workouts = () => {
    window.scrollTo(0, 0)
    props.history.push('/workouts')
  }

  const users = () => {
    window.scrollTo(0, 0)
    props.history.push('/users')
  }

  const dash = () => {
    window.scrollTo(0, 0)
    props.history.push('/dash')
  }

  const settings = () => {
    window.scrollTo(0, 0)
    props.history.push('/settings')
  }

  const logout = () => {
    window.scrollTo(0, 0)
    props.history.push('/')
    props.logoutUser()
  }

  return ( <div style={menuStyle}>
    <Menu inverted color='red'>
      <Menu.Item onClick={home}>
        <Icon name='home' />
      </Menu.Item>
      <Menu.Item onClick={workouts}>
        <Icon name='hand rock' />
      </Menu.Item>
      <Menu.Item onClick={users}>
        <Icon name='user circle' />
      </Menu.Item>
      <Menu.Item onClick={dash}>
        <Icon name='id card' />
      </Menu.Item>
      <Menu.Item >
        <Input style={barStyle} />
      </Menu.Item>
      <Menu.Item onClick={settings}>
        <Icon name='settings' />
      </Menu.Item>
      <Menu.Item onClick={logout}>
        <Icon name='log out' />
      </Menu.Item>
    </Menu>
  </div>)
}

export default connect(null, { logoutUser })(withRouter(Menubar))