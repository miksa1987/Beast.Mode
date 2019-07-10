import React from 'react'
import { connect } from 'react-redux'
import { Input, Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { loginUser } from '../reducers/currentUser'

const LoginForm = (props) => {
  const loginStyle = {
    position: 'absolute',
    top: '30%',
    left: '30%'
  }

  const login = (event) => {
    event.preventDefault()
    props.loginUser({ username: event.target.username.value, password: event.target.password.value })
    window.history.pushState('', 'feed', '/')
  }

  return ( <div style={loginStyle}>
    <Card>
    <Card.Header>
      <h3>Beast.MODE: Log in</h3>
    </Card.Header>
    
    <form onSubmit={login}>
    <Card.Description>
      <table><tbody>
        <tr><td>Username</td><td><Input name='username' /></td></tr> 
        <tr><td>Password</td><td><Input name='password' /></td></tr>  
      </tbody></table>
    </Card.Description>
    <Card.Content extra>
      <Button type='submit'>Login</Button>
    </Card.Content>
    </form>
    </Card>
    <p>Not registered? <Link to='/newuser'>Create an account</Link></p>
  </div> )
}

export default connect(null, { loginUser })(LoginForm)