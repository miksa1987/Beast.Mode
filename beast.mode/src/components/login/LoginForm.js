import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'semantic-ui-react'

import { loginUser } from '../../reducers/currentUser'
import NewUser from './NewUser'
import useOrientation from '../../hooks/useOrientation'

const LoginForm = (props) => {
  const [view, setView] = useState('login')
  const orientation = useOrientation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const backStyle = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    backgroundColor: '#880000'
  }
  
  const loginStyle = {
    color: 'white',
    position: 'absolute',
    width: '40%',
    top: '30%',
    left: '50%',
    marginLeft: '-20%'
  }

  const mobileStyle = {
    color: 'white',
    position: 'absolute',
    width: '80%',
    top: '30%',
    left: '50%',
    marginLeft: '-40%'
  }

  const tableStyle = {
    width: '100%'
  }
  
  const bottomStyle = {
    color: 'white',
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    width: '100%'
  }

  const elementStyle = {
    width: '100%'
  }

  const login = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    props.loginUser({ username, password })
    props.setNotification(`${username} logged in `, 3)
  }

  if (view === 'newuser') {
    return ( <div><NewUser setView={setView} /></div>)
  }

  return ( <div style={backStyle}>
    <div style={orientation === 'portrait' ? mobileStyle : loginStyle}>
      <p style={bottomStyle}>About Beast.MODE</p>
      <Form onSubmit={login}>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td>
                <h2>Beast.MODE</h2>
              </td>
            </tr>
            <tr>
              <td>
                <p>Combining social media with training apps!</p>
              </td>
            </tr>
            <tr>
              <td>
                <Input style={elementStyle} placeholder='username' name='username' />
              </td>
            </tr>
            <tr>
              <td>
                <Input style={elementStyle} placeholder='password' name='password' type='password' />
              </td>
            </tr>
            <tr>
              <td>
                <Button color='green' style={elementStyle} type='submit'>Log in</Button>
              </td>
            </tr>
            <tr>
              <td>
                <Button color='blue' style={elementStyle} onClick={() => setView('newuser')}>New user?</Button>
              </td>
            </tr>
          </tbody>
        </table>    
      </Form>
    </div>
  </div> )
}

export default connect(null, { loginUser })(LoginForm)