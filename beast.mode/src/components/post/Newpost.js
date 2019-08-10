import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, TextArea, Button, Image, Icon } from 'semantic-ui-react'
import communicationService from '../../service/communication'
import { addNewToFeed } from '../../reducers/feedReducer'
import { addWorkout } from '../../reducers/workoutsReducer'
import useField from '../../hooks/useField'
import './Newpost.css'
import '../Animation.css'

const Newpost = (props) => {
  const [isWorkout, setIsWorkout] = useState(props.isWorkout)
  const [didWorkout, setDidWorkout] = useState(false)
  const [text, resetText] = useField('text')
  const [file, setFile] = useState('')
  const [image, setImage] = useState('')

  const addFile = () => {
    const input = document.getElementById('real-input')
    input.click()
  }

  const postFile = async (event) => {
    const chosenFile = event.target.files[0]
    if (chosenFile !== file) {
      setFile(chosenFile)
      setImage(await communicationService.postImage(chosenFile))
    }
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
    if(!isWorkout) props.addNewToFeed(post)
    if(isWorkout && !didWorkout) newPost = await communicationService.post('/workouts/new', post)
    if(isWorkout && didWorkout) props.addNewToFeed(post)

    isWorkout ? props.addWorkout(newPost) : console.log('HII')

    resetText()
    props.setShowNewpost && props.setShowNewpost(false)
  }
  
  return ( <div className='newpost-component fade-in-fast'>
    <strong>Create new</strong>
    <Form onSubmit={post}>
      <TextArea id='post-textarea' style={{ resize: 'none' }} rows={6} {...text} />
      
      <table>
        <tbody>
          <tr>
            <td><Image src={image ? image 
              : 'https://react.semantic-ui.com/images/wireframe/image.png'} size='mini' /></td>
            <td>
              <div>
                <input type='file' id='real-input' name='real-input' onChange={postFile} />
                <span>Upload a picture</span>
                <Button type='button' compact icon onClick={addFile}>
                  <Icon name='plus' />
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
  
      <Button id='postbutton' primary className='button-style' type='submit'>Post</Button>
      {!props.isWorkout && <Button.Group>
        <Button id='updatebutton' className='button-style' type='button' color={!isWorkout ? 'blue' : 'black'} 
          onClick={() => setIsWorkout(false)}>Update</Button>
        <Button id='workoutbutton' className='button-style' type='button' color={isWorkout ? 'blue' : 'black'} 
          onClick={() => setIsWorkout(true)}>Workout</Button>
      </Button.Group>}
      {` `}
      {isWorkout && <Button id='didworkoutbutton' className='button-style' type='button' color={didWorkout ? 'blue' : 'black'}
        onClick={() => setDidWorkout(!didWorkout)}>Did it?</Button>}
      {props.setShowNewpost && <Button id='didworkoutbutton' className='button-style' color='blue' floated='right' 
        onClick={() => props.setShowNewpost(false)}>Cancel</Button>}
    </Form>
  </div> )
}

const mapStateToProps = (state) => {
  return { 
    currentUser: state.currentUser 
  }
}

export default connect(mapStateToProps, { addNewToFeed, addWorkout })(Newpost)