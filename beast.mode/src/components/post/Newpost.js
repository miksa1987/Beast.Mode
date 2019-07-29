import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, TextArea, Button, Checkbox, Icon } from 'semantic-ui-react'
import communicationService from '../../service/communication'
import { addToFeed } from '../../reducers/feedReducer'
import { addWorkout } from '../../reducers/workoutsReducer'
import useField from '../../hooks/useField'
import './Newpost.css'

const Newpost = (props) => {
  const [isWorkout, setIsWorkout] = useState(props.isWorkout)
  const [didWorkout, setDidWorkout] = useState(false)
  const [text, resetText] = useField('text')
  //const [textContent, setTextContent] = useState('')
  const [file, setFile] = useState('')

  const post = async (event) => {
    event.preventDefault()

    const data = new FormData()
    data.append('content', text.value)
    data.append('image', file)
    data.append('user', props.currentUser.id)
    data.append('likes', 0)
    !isWorkout ? data.append('type', 'post') 
      : didWorkout ? data.append('type', 'doneworkout') : data.append('type', 'workout') 

    const header = {
      'content-type': 'multipart/form-data'
    }
    let newPost = {}

    for(let pair of data.entries()) {
      console.log(`${pair[0]} ${pair[1]}`)
    }

    if(!isWorkout) newPost = await communicationService.post('/posts/new', data, header)
    if(isWorkout && !didWorkout) newPost = await communicationService.post('/workouts/new', data, header)
    if(isWorkout && didWorkout) newPost = await communicationService.post('/doneworkouts/new', data, header)

    isWorkout ? props.addWorkout(newPost) : props.addToFeed(newPost)

    resetText()
    props.setShowNewpost && props.setShowNewpost(false)
  }
  
  return ( <div className='newpost-component'>
    <strong>Create new</strong>
    <Form onSubmit={post}>
      <TextArea style={{ resize: 'none' }} rows={6} {...text} />
      <input type='file' onChange={({ target }) => setFile(target.files[0])} />
  
      <Button primary type='submit'>Post</Button>
      {!props.isWorkout && <Button.Group>
        <Button type='button' color={!isWorkout ? 'blue' : 'black'} onClick={() => setIsWorkout(false)}>Update</Button>
        <Button type='button' color={isWorkout ? 'blue' : 'black'} onClick={() => setIsWorkout(true)}>Workout</Button>
      </Button.Group>}
      {` `}
      {isWorkout && <Button type='button' color={didWorkout ? 'blue' : 'black'}
        onClick={() => setDidWorkout(!didWorkout)}>Did it?</Button>}
      {props.setShowNewpost && <Button color='blue' floated='right' onClick={() => props.setShowNewpost(false)}>Cancel</Button>}
    </Form>
  </div> )
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps, { addToFeed, addWorkout })(Newpost)