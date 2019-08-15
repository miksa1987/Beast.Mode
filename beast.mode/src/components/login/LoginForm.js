import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button } from 'semantic-ui-react'

import { loginUser } from '../../reducers/currentUser'
import { setNotification } from '../../reducers/notificationReducer'
import About from './About'
import './LoginForm.css'
import '../Animation.css'

const LoginForm = (props) => {
  const [showAbout, setShowAbout] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const login = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    props.loginUser({ username, password })
  }

  const showTheAbout = (event) => {
    event.preventDefault()
    setShowAbout(true)
  }

  return ( <div className='background fade-in-fast'>
    <div className='login'>
      { showAbout && <About setShowAbout={setShowAbout} />}
      <a href='' className='bottom' onClick={showTheAbout}>About Beast.MODE</a>
      <Form onSubmit={login}>
        <table className='login-element'>
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
                <Input className='login-element' id='username' placeholder='username' name='username' />
              </td>
            </tr>
            <tr>
              <td>
                <Input className='login-element' id='passwd' placeholder='password' name='password' type='password' />
              </td>
            </tr>
            <tr>
              <td>
                <Button color='green' id='login' className='element' type='submit'>Log in</Button>
              </td>
            </tr>
            <tr>
              <td>
                <Button color='blue' id='newuser' className='element' onClick={() => props.history.push('/newuser')}>New user?</Button>
              </td>
            </tr>
          </tbody>
        </table>    
      </Form>
    </div>
  </div> )
}

export default connect(null, { loginUser, setNotification })(withRouter(LoginForm))