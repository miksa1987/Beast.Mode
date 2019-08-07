import React from 'react'
import Notification from '../Notification'
import communicationService from '../../service/communication'
import { Input, TextArea, Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import useField from '../../hooks/useField'
import './NewUser.css'

const NewUser = (props) => {
  const [username, resetUsername] = useField('text')
  const [email, resetEmail] = useField('text')
  const [info, resetInfo] = useField('text')
  const [password, resetPassword] = useField('password')
  const [rPassword, resetRPassword] = useField('password')

  const create = async () => {
    //event.preventDefault()

    if (password.value !== rPassword.value) {
      console.log(password)
      console.log(rPassword)
      props.setNotification('Passwords do not match. Please re-enter passwords.', 3)
      resetPassword()
      resetRPassword()
      return
    }
    try {
      const user = {
        username: username.value,
        password: password.value,
        email: email.value,
        info: info.value
      }
 
      await communicationService.post('/users/new', user)

      resetUsername()
      resetEmail()
      resetInfo()
      resetPassword()
      resetRPassword()

      props.setNotification(`User ${user.username} created. You may now log in.`, 3)
      props.setView('login')
    } catch (error) {
      console.log(error.message)
    }
  }

  return ( <div className='style block'>
    <h2>Create new user</h2>
    {/* Try it this way */}
      <table className='element'>
        <tbody>
          <tr>
            <td>
              <Input placeholder='Desired username' {...username} size='small' fluid id='username' />
            </td>
          </tr>
          <tr>
            <td>
              <Input placeholder='Your email' {...email} size='small' fluid id='email' />
            </td>
          </tr>
          <tr>
            <td>
              <TextArea placeholder='Write some information about yourself' rows='5' className='element' {...info} id='info' />
            </td>
          </tr>
          <tr>
            <td>
              <Input placeholder='Create a password' {...password} size='small' fluid id='passwd' />
            </td>
          </tr>
          <tr>
            <td>
              <Input placeholder='Repeat password' {...rPassword} size='small' fluid id='passwd2' />
            </td>
          </tr>
        </tbody>
      </table>
      <Button fluid onClick={create} id='submit'>Create your account</Button>
    
    <Notification />
  </div> )
}

export default connect(null, { setNotification})(NewUser)