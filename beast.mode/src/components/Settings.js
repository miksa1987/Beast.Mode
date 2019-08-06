import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Input, Form, Button, Image, TextArea } from 'semantic-ui-react'
import { updateUser } from '../reducers/currentUser'
import { setNotification } from '../reducers/notificationReducer'
import communicationService from '../service/communication'
import useField from '../hooks/useField'
import useWindowSize from '../hooks/useWindowSize'

import './Animation.css'
import './Settings.css'

const Settings = (props) => {
  const [file, setFile]                           = useState('')
  const [image, setImage]                         = useState('')
  const [email, resetEmail]                       = useField('text')
  const [info, resetInfo]                         = useField('text')
  const [password, resetPassword]                 = useField('password')
  const [repeatedPassword, resetRepeatedPassword] = useField('password')

  const window = useWindowSize()

  if (props.currentUser === undefined) {
    return ( <div>Loading...</div> )
  }

  const imagesrc = image ? image : props.currentUser.picture
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
  
  const postFile = async (event) => {
    const chosenFile = event.target.files[0]
    if (chosenFile !== file) {
      setFile(chosenFile)
      setImage(await communicationService.postImage(chosenFile))
    }
  }

  const saveChanges = (event) => {
    event.preventDefault()

    if (password.value !== repeatedPassword.value) {
      props.setNotification('Passwords do not match!', 3)
      return
    }
        
    const newChanges = {
      image,
      email: email.value,
      info: info.value,
      password: password.value
    }

    props.updateUser(newChanges)
    resetEmail()
    resetInfo()
    resetPassword()
    resetRepeatedPassword()
  }

  if (window.width < window.height) {  
    return ( <div className='fade-in-fast element'>
      <h3>Settings</h3>
      <Form onSubmit={saveChanges}>
        <Image size='small' rounded src={imagesrc} />
        Update your profile picture:<br/>
        <input type='file' onChange={postFile} />
        <Input fluid size='small' width='8' placeholder={props.currentUser.email ? 
          props.currentUser.email : 'No email set!'} {...email} />
        <TextArea rows='6' style={textAreaStyle} placeholder={props.currentUser.info ? 
          props.currentUser.info : ''} {...info} />
        <Input fluid size='small' placeholder='Change password?' {...password} />
        <Input fluid size='small' placeholder='Repeat new password' {...repeatedPassword} />
        <Button fluid color='green' type='submit'>Save changes</Button>
      </Form>
    </div> )
  }

  return ( <div className='fade-in-fast element'>
    <h3>Settings</h3>
    <Form onSubmit={saveChanges}>
    <table style={picStyle}>
      <tbody>
        <tr>
          <td>
            <Image floated='right' rounded size='medium' src={imagesrc} />
          </td>
        </tr>
        <tr>
          <td>
            Update your profile picture:<br/>
            <input type='file' onChange={postFile} />
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

export default connect(mapStateToProps, { updateUser, setNotification })(Settings)