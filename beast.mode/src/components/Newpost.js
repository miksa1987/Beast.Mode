import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, TextArea, Button, Checkbox } from 'semantic-ui-react'
import parser from '../service/parser'
import communicationService from '../service/communication'
import { addToFeed } from '../reducers/feedReducer'

const elementStyle = {
  align: 'center',
  margin: 'auto',
  minWidth: '95%',
  maxWidth: '95%',
  paddingTop: '5px',
  paddingLeft: '5px',
  flexGrow: '1',
  flexShrink: '1',
  flexBasis: '95%'
}

const buttonStyle = {
  margin: '5px 5px 5px 5px'
}

const Newpost = (props) => {
  const [isWorkout, setIsWorkout] = useState(false)
  const [textContent, setTextContent] = useState('')
  const [file, setFile] = useState('')

  const changeText = (event) => {
    setTextContent(event.target.value)
    console.log(textContent)
    if (parser.isWorkout(textContent)) {
      setIsWorkout(true)
    } else {
      setIsWorkout(false)
    }
  }

  const workoutToggleChange = (event, data) => setIsWorkout(data.checked)

  const post = async (event) => {
    event.preventDefault()
    let post = {
      content: textContent,
      picture: '',
      user: props.currentUser.id,
      likes: 0,
      comments: []
    }

    const data = new FormData()
    data.append('content', textContent)
    data.append('image', file)
    data.append('user', props.currentUser.id)
    data.append('likes', 0)
    isWorkout ? data.append('type', 'workout') : data.append('type', 'post')
    isWorkout ? post.type = 'workout' : post.type = 'post'
    console.log(data)

    const header = {
      'content-type': 'multipart/form-data'
    }

    post.type === 'workout' 
    ? await communicationService.post('/workouts/new', data, header) : await communicationService.post('/posts/new', data, header)
    
    props.addToFeed({ ...post, _id: Math.random()*10000, user: { username: props.currentUser.username } })
  }

  return ( <div style={elementStyle}>
      <Form onSubmit={post}>
        <input type='file' onChange={({ target }) => setFile(target.files[0])} />
        <TextArea name='post' onChange={changeText} rows={8} placeholder='What have you done?! (tip: you can use hashtags!)' />
        { isWorkout ? <><Checkbox toggle name='workoutToggle' onChange={workoutToggleChange} /><strong>Did it!</strong></> : null }
        <Button style={buttonStyle}>Got picture?</Button>
        <Button type='submit' style={buttonStyle}>Post!</Button>
      </Form>
  </div> )
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps, { addToFeed })(Newpost)