import React from 'react'
import { connect } from 'react-redux'
import { Input, Button } from 'semantic-ui-react'
import { loginUser } from '../reducers/currentUser'

const LoginForm = (props) => {
  const login = (event) => {
    event.preventDefault()
    props.loginUser({ username: event.target.username.value, password: event.target.password.value })
  }

  return ( <div>
    <form onSubmit={login}>
      <table><tbody>
        <tr><td>Username</td><td><Input name='username' /></td></tr> 
        <tr><td>Password</td><td><Input name='password' /></td></tr>  
      </tbody></table>
      <Button type='submit'>Login</Button>
    </form>
  </div> )
}

export default connect(null, { loginUser })(LoginForm)