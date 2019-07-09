import React from 'react'
import communicationService from '../service/communication'
import { Input, TextArea, Button } from 'semantic-ui-react'

const NewUser = (props) => {
  const create = (event) => {
    event.preventDefault()
    const user = {
      username: event.target.username,
      password: event.target.password,
      email: event.target.email,
      info: event.target.info,
      age: Number(event.target.age),
    }
    communicationService.post('/users/new', user)
  }

  return ( <div>
    <h1>Create new user</h1>
    <form onSubmit={create}>
      <p>Choose username
      <Input size='small' name='username' /></p>
      <p>Enter email
      <Input size='small' name='email' /></p>
      <p>Enter some additional information about yourself
      <TextArea name='info' /></p>
      <p>How old are you?
      <Input size='small' name='age' /></p>
      <p>Choose password
      <Input size='small' type='password' name='password' /></p>
      <p>Repeat password
      <Input size='small' type='password' name='password' /></p>
      <Button type='submit'>Create your account</Button>
    </form>
  </div> )
}

export default NewUser