import React from 'react'
import communicationService from '../../service/communication'
import { Input, TextArea, Button, Form } from 'semantic-ui-react'

const NewUser = (props) => {
  const style = {
    height: '20em'
  }

  const create = async (event) => {
    event.preventDefault()
    const user = {
      username: event.target.username.value,
      password: event.target.password.value,
      email: event.target.email.value,
      info: event.target.info.value
    }
 
    const response = await communicationService.post('/users/new', user)
    console.log(response)
  }

  return ( <div style={style}>
    <h2>Create new user</h2>
    <Form onSubmit={create}>
      <table>
        <tbody>
          <tr>
            <td>
              <Input placeholder='Desired username' name='username' size='small' />
              <Input placeholder='Your email' name='email' size='small' />
            </td>
          </tr>
          <tr>
            <td>
              <Input name='birthday' placeholder='Birth day' type='number' size='small' />
              <Input name='birthmonth' placeholder='Birth month' type='number' size='small' />
              <Input name='birthyear' placeholder='Birth year' type='number' size='small' />
            </td>
          </tr>
          <tr>
            <td>
              <TextArea placeholder='Write some information about yourself' name='info' />
            </td>
          </tr>
          <tr>
            <td>
              <Input placeholder='Create a password' type='password' name='password' size='small' />
              <Input placeholder='Repeat password' type='password' name='passconfirm' size='small' />
            </td>
          </tr>
        </tbody>
      </table>
      <Button type='submit'>Create your account</Button>
    </Form>
  </div> )
}

export default NewUser