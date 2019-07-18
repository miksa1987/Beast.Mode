import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Input, Form, Button, Image, TextArea } from 'semantic-ui-react'
import { updateUser } from '../reducers/currentUser'
import useField from '../hooks/useField'

const Settings = (props) => {
  const [file, setFile]                           = useState('')
  const [email, resetEmail]                       = useField('text')
  const [birthdate, resetBirthdate]               = useField('text')
  const [info, resetInfo]                         = useField('text')
  const [password, resetPassword]                 = useField('password')
  const [repeatedPassword, resetRepeatedPassword] = useField('password')
  
  const picStyle = {
    position: 'absolute',
    top: '0px',
    right: '20px'
  }

  const tableStyle = {
    width: '50%'
  }

  const textAreaStyle = {
    resize: 'none'
  }

  const saveChanges = (event) => {
    event.preventDefault()

    const newChanges = new FormData()
    file !== '' && newChanges.append('image', file)
    email.value !== '' && newChanges.append('email', email.value)
    birthdate.value !== '' && newChanges.append('birthdate', birthdate.value)
    info.value !== '' && newChanges.append('info', info.value)
    
    if (password.value !== '' && password.value === repeatedPassword.value) {
      newChanges.append('password', password.value)
    } else {
      if (password.value !== repeatedPassword.value) {
        console.log('Not a match!')
      }
    }
    
    props.updateUser(newChanges)
  }

  if(props.currentUser === undefined) {
    return ( <div>Loading...</div> )
  }

  return ( <div>
    <h3>Settings</h3>
    <Form onSubmit={saveChanges}>
    <table style={picStyle}>
      <tbody>
        <tr>
          <td>
            <Image floated='right' size='medium' src={props.currentUser.picture !== '' ?
              props.currentUser.picture : 'https://react.semantic-ui.com/images/wireframe/image.png'} />
          </td>
        </tr>
        <tr>
          <td>
            Update your profile picture:<br/>
            <input type='file' onChange={({target}) => setFile(target.files[0])} />
          </td>
        </tr>
      </tbody>
    </table>
    <table style={tableStyle}>
      <tbody>
        <tr>
          <td>
            <Input fluid size='small' width='8' placeholder={props.currentUser.email ? 
              props.currentUser.email : 'No email set!'} {...email} />
          </td>
        </tr>
        <tr>
          <td>
            <Input fluid size='small' width='8' placeholder={props.currentUser.birthdate ? 
              props.currentUser.birthdate : 'No birthdate set!'} {...birthdate} />
          </td>
        </tr>
        <tr>
          <td>
            <TextArea rows='6' style={textAreaStyle} value={props.currentUser.info ? 
              props.currentUser.info : ''} placeholder='Enter information about yourself' {...info} />
          </td>
        </tr>
        <tr>
          <td>
            <Input fluid size='small' placeholder='Change password?' {...password} />
          </td>
        </tr>
        <tr>
          <td>
            <Input fluid size='small' placeholder='Repeat new password' {...repeatedPassword} />
          </td>
        </tr>
        <tr>
          <td>
            <Button fluid color='green' type='submit'>Save changes</Button>
          </td>
        </tr>
      </tbody>
    </table>
    </Form>
  </div> )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { updateUser })(Settings)