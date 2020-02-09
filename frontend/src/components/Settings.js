import React, { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Input, Form, Button, Image, TextArea } from 'semantic-ui-react'
import { updateUser } from '../reducers/currentUser'
import { setNotification } from '../reducers/notificationReducer'
import FileInput from './universal/FileInput'
import Animation from './universal/Animation'
import useField from '../hooks/useField'

const BaseLayout = styled.div`
  display: grid;
  grid-template: 100% / 50% 50%;
  background-color: white;
  padding: 5px;
  margin: 10px;
  padding-right: 10px;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    margin: 0px;
  }
`

const Settings = (props) => {
  const [file, setFile]                           = useState('')
  const [image, setImage]                         = useState('')
  const [email, resetEmail]                       = useField('text')
  const [info, resetInfo]                         = useField('text')
  const [password, resetPassword]                 = useField('password')
  const [repeatedPassword, resetRepeatedPassword] = useField('password')

  if (props.currentUser === undefined) {
    return ( <div>Loading...</div> )
  }

  const imagesrc = image ? image : props.currentUser.picture

  const textAreaStyle = {
    resize: 'none',
    width: '100%'
  }

  const handleSubmit = (event) => {
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

  return (
    <Animation>
      <form onSubmit={handleSubmit}>
        <BaseLayout>
          <div>
            <h1>Settings</h1>
            <Image floated='right' rounded size='medium' src={imagesrc} />
            <FileInput file={file} setFile={setFile} setImage={setImage} />
          </div>
          <div>
            <input fluid size='small' width='8' placeholder={props.currentUser.email ? 
              props.currentUser.email : 'No email set!'} {...email} />
            <textarea rows='6' style={textAreaStyle} value={props.currentUser.info ? 
              props.currentUser.info : ''} placeholder='Enter information about yourself' {...info} />
            <input fluid size='small' placeholder='Change password?' {...password} />
            <input fluid size='small' placeholder='Repeat new password' {...repeatedPassword} />
            <button fluid color='green' type='submit'>Save changes</button>
          </div>
        </BaseLayout>
      </form>
    </Animation>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { updateUser, setNotification })(Settings)