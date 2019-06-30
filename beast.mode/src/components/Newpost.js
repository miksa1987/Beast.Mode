import React from 'react'
import { connect } from 'react-redux'
import {Segment, Form, TextArea, Button} from 'semantic-ui-react'
import parser from '../service/parser'
import communicationService from '../service/communication'
import { addToFeed } from '../reducers/feedReducer'

const elementStyle = {
  minWidth: '50%',
  maxWidth: '50%',
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
  const post = (event) => {
    event.preventDefault()
    const post = {
      _id: Math.random()*100000,
      content: event.target.post.value,
      picture: '',
      user: props.currentUser.id,
      likes: 0,
      comments: []
    }
    
    if(parser.isWorkout(post)) {
      post.type = 'workout'
      communicationService.post('/workouts', post)
    } else {
      post.type = 'post'
      communicationService.post('/posts', post)
    }

    post.user = props.currentUser.username
    props.addToFeed(post)
  }

  return ( <div style={elementStyle}>
    <Segment>
      <Form onSubmit={post}>
        <TextArea name='post' rows={4} placeholder='What have you done?! (tip: you can use hashtags!)' />
        <Button style={buttonStyle}>Got picture?</Button>
        <Button type='submit' style={buttonStyle}>Post!</Button>
      </Form>
    </Segment>
  </div> )
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps, { addToFeed })(Newpost)