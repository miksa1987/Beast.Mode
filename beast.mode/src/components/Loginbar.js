import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'semantic-ui-react'
import { loginUser } from '../reducers/currentUser'

const Loginbar = (props) => {
  const loginStyle = {
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    height: '4em',
    position: 'fixed',
    top: '0px',
    left: '0px',
    padding: '15px 15px 15px 15px',
    backgroundColor: '#dddddd'
  }

  const headerStyle = {
    padding: '10px 10px 10px 10px'
  }

  const login = (event) => {
    event.preventDefault()
    props.loginUser({ username: event.target.username.value, password: event.target.password.value })
  }

  return ( <div style={loginStyle}>
    <Form onSubmit={login}>
      <strong style={headerStyle}>Beast.MODE</strong>
      <Input style={headerStyle} placeholder='Username' size='small' name='username' />
      <Input style={headerStyle} placeholder='Password' type='password' size='small' name='password' />
      <Button style={headerStyle} type='submit' color='green'>Log in</Button>
    </Form>
  </div> )
}


export default connect(null, { loginUser })(Loginbar)