import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button } from 'semantic-ui-react'

import { loginUser } from '../../reducers/currentUser'
import { setNotification } from '../../reducers/notificationReducer'
import NewUser from './NewUser'
import './LoginForm.css'
import '../Animation.css'

const LoginForm = (props) => {
  const [view, setView] = useState('login')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const login = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    props.loginUser({ username, password })
  }

  if (view === 'newuser') {
    return ( <div><NewUser setView={setView} /></div>)
  }

  return ( <div className='background fade-in-fast'>
    <div className='login'>
      <p className='bottom'>About Beast.MODE</p>
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