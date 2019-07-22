import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Menu } from 'semantic-ui-react'
import { loginUser } from '../../reducers/currentUser'
import { setNotification } from '../../reducers/notificationReducer'

const Loginbar = (props) => {
  const loginStyle = {
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    position: 'fixed',
    top: '0px',
    left: '0px',
    backgroundColor: '#ee0000'
  }

  const headerStyle = {
    padding: '10px 10px 10px 10px'
  }

  const login = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    props.loginUser({ username, password })
    props.setNotification(`${username} logged in `, 3)
  }

  return ( <div style={loginStyle}>
    <Form onSubmit={login}>
      <Menu inverted color='red'>
        <Menu.Item>
          <h3 style={headerStyle}>Beast.MODE</h3>
        </Menu.Item>
        <Menu.Item>
          <Input style={headerStyle} placeholder='Username' size='small' name='username' />
        </Menu.Item>
        <Menu.Item>
          <Input style={headerStyle} placeholder='Password' type='password' size='small' name='password' />   
        </Menu.Item>
        <Menu.Item>
          <Button style={headerStyle} type='submit' color='green'>Log in</Button>
        </Menu.Item>
      </Menu>
    </Form>
  </div> )
}


export default connect(null, { loginUser, setNotification })(Loginbar)