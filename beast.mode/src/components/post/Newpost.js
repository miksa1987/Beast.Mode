import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, TextArea, Button, Image } from 'semantic-ui-react'
import communicationService from '../../service/communication'
import { addToFeed } from '../../reducers/feedReducer'
import { addWorkout } from '../../reducers/workoutsReducer'
import useField from '../../hooks/useField'
import './Newpost.css'

const Newpost = (props) => {
  const [isWorkout, setIsWorkout] = useState(props.isWorkout)
  const [didWorkout, setDidWorkout] = useState(false)
  const [text, resetText] = useField('text')
  const [file, setFile] = useState('')
  const [image, setImage] = useState('')

  const postFile = async (event) => {
    await setFile(event.target.files[0])
    console.log(file)

    const data = new FormData()
    data.append('image', file)

    const header = {
      'content-type': 'multipart/form-data'
    }

    const response = await communicationService.post('/image/new', data, header)
    console.log(response)
    setImage(response.imageuri)
  }

  const post = async (event) => {
    event.preventDefault()

    let post = {
      content: text.value,
      picture: image,
      user: props.currentUser.id,
      likes: 0,
      type: 'post'
    }

    if (isWorkout) {
      if (didWorkout) post.type = 'doneworkout'
      else post.type = 'workout'
    }

    let newPost = {}
    if(!isWorkout) newPost = await communicationService.post('/posts/new', post)
    if(isWorkout && !didWorkout) newPost = await communicationService.post('/workouts/new', post)
    if(isWorkout && didWorkout) newPost = await communicationService.post('/doneworkouts/new', post)

    isWorkout ? props.addWorkout(newPost) : props.addToFeed(newPost)

    resetText()
    props.setShowNewpost && props.setShowNewpost(false)
  }
  
  return ( <div className='newpost-component'>
    <strong>Create new</strong>
    <Form onSubmit={post}>
      <TextArea style={{ resize: 'none' }} rows={6} {...text} />
      
      <table>
        <tbody>
          <tr>
            {image !== '' && <td><Image src={image} size='tiny' /></td>}
            <td>
              <input type='file' onChange={postFile} />
            </td>
          </tr>
        </tbody>
      </table>
  
      <Button primary className='button-style' type='submit'>Post</Button>
      {!props.isWorkout && <Button.Group>
        <Button className='button-style' type='button' color={!isWorkout ? 'blue' : 'black'} 
          onClick={() => setIsWorkout(false)}>Update</Button>
        <Button className='button-style' type='button' color={isWorkout ? 'blue' : 'black'} 
          onClick={() => setIsWorkout(true)}>Workout</Button>
      </Button.Group>}
      {` `}
      {isWorkout && <Button className='button-style' type='button' color={didWorkout ? 'blue' : 'black'}
        onClick={() => setDidWorkout(!didWorkout)}>Did it?</Button>}
      {props.setShowNewpost && <Button className='button-style' color='blue' floated='right' 
        onClick={() => props.setShowNewpost(false)}>Cancel</Button>}
    </Form>
  </div> )
}

const mapStateToProps = (state) => {
  return { 
    currentUser: state.currentUser 
  }
}

export default connect(mapStateToProps, { addToFeed, addWorkout })(Newpost)