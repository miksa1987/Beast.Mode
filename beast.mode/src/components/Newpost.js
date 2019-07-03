import React, { useState } from 'react'
import { connect } from 'react-redux'
import {Segment, Form, TextArea, Button, Checkbox} from 'semantic-ui-react'
import parser from '../service/parser'
import communicationService from '../service/communication'
import { addToFeed } from '../reducers/feedReducer'

const elementStyle = {
  minWidth: '45%',
  maxWidth: '45%',
  paddingTop: '5px',
  paddingLeft: '5px',
  flexGrow: '1',
  flexShrink: '1',
  flexBasis: '50%'
}

const buttonStyle = {
  margin: '5px 5px 5px 5px'
}

const Newpost = (props) => {
  const [isWorkout, setIsWorkout] = useState(false)
  const [textContent, setTextContent] = useState('')

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

    isWorkout ? post.type = 'workout' : post.type = 'post'
    console.log(`type ${post.type}`)

    post.type === 'workout' 
    ? await communicationService.post('/workouts', post) : await communicationService.post('/posts', post)
    
    props.addToFeed({ ...post, _id: Math.random()*10000, user: { username: props.currentUser.username } })
  }

  return ( <div style={elementStyle}>
      <Form onSubmit={post}>
        <TextArea name='post' onChange={changeText} rows={4} placeholder='What have you done?! (tip: you can use hashtags!)' />
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