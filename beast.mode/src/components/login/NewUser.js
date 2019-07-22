import React from 'react'
import communicationService from '../../service/communication'
import { Input, TextArea, Button, Form } from 'semantic-ui-react'
import useField from '../../hooks/useField'
import useOrientation from '../../hooks/useOrientation'

const NewUser = (props) => {
  const orientation = useOrientation()

  const style = {
    width: '50%'
  }
  
  const mobileStyle = {
    width: '90%'
  }

  const tableStyle = {
    width: '100%'
  }

  const elementStyle = {
    width: '100%',
    resize: 'none'
  }

  const [username, resetUsername] = useField('text')
  const [email, resetEmail] = useField('text')
  const [info, resetInfo] = useField('text')
  const [password, resetPassword] = useField('password')
  const [rPassword, resetRPassword] = useField('password')

  const create = async (event) => {
    event.preventDefault()
    const user = {
      username: username.value,
      password: password.value,
      email: email.value,
      info: info.value
    }
 
    const response = await communicationService.post('/users/new', user)

    resetUsername()
    resetEmail()
    resetInfo()
    resetPassword()
    resetRPassword()

    props.setView('login')
  }

  return ( <div style={orientation === 'portrait' ? mobileStyle : style}>
    <h2>Create new user</h2>
    <Form onSubmit={create}>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td>
              <Input placeholder='Desired username' {...username} size='small' style={elementStyle} />
            </td>
          </tr>
          <tr>
            <td>
              <Input placeholder='Your email' {...email} size='small' style={elementStyle} />
            </td>
          </tr>
          <tr>
            <td>
              <Input name='birthday' placeholder='Birth day' type='number' size='small' style={elementStyle} />
              <Input name='birthmonth' placeholder='Birth month' type='number' size='small' style={elementStyle} />
              <Input name='birthyear' placeholder='Birth year' type='number' size='small' style={elementStyle} />
            </td>
          </tr>
          <tr>
            <td>
              <TextArea placeholder='Write some information about yourself' rows='5' style={elementStyle} {...info} />
            </td>
          </tr>
          <tr>
            <td>
              <Input placeholder='Create a password' {...password} size='small' style={elementStyle} />
            </td>
          </tr>
          <tr>
            <td>
              <Input placeholder='Repeat password' {...rPassword} size='small' style={elementStyle} />
            </td>
          </tr>
        </tbody>
      </table>
      <Button style={elementStyle} type='submit'>Create your account</Button>
    </Form>
  </div> )
}

export default NewUser