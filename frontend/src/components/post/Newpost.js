import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, TextArea, Button, Image } from 'semantic-ui-react'
import communicationService from '../../service/communication'
import { addNewToFeed } from '../../reducers/feedReducer'
import { addWorkout } from '../../reducers/workoutsReducer'
import useField from '../../hooks/useField'
import FileInput from '../universal/FileInput'
import FlexDivColumn from '../universal/FlexDivColumn'
import FlexDivRow from '../universal/FlexDivRow'
import Animation from '../universal/Animation'

const Newpost = (props) => {
  const [isWorkout, setIsWorkout] = useState(props.isWorkout)
  const [didWorkout, setDidWorkout] = useState(false)
  const [text, resetText] = useField('text')
  const [file, setFile] = useState('')
  const [image, setImage] = useState('')

  const workoutTip = `Write your workout like:
    WORKOUT TITLE OR DESCRIPTION
    5x5 pull ups
    5x10 push ups\n
    or\n
    WORKOUT TITLE OR DESCRIPTION
    5 pull ups
    10 push ups
    5 rounds`

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

    isWorkout && props.addWorkout(newPost)

    resetText()
    props.setShowNewpost && props.setShowNewpost(false)
  }
  
  return (
    <Animation>
      <FlexDivColumn>

        <textarea id='post-textarea' style={{ resize: 'none' }} rows={6} {...text} 
        placeholder={isWorkout && workoutTip} />

        <FlexDivRow>
          <Image src={image ? image 
            : 'https://react.semantic-ui.com/images/wireframe/image.png'} size='mini' />
          <FileInput file={file} setFile={setFile} setImage={setImage} />
        </FlexDivRow>

        <FlexDivRow>
          <Button compact data-testid='postbutton' id='postbutton' color='red' className='button-style' type='submit'>Post</Button>

          {!props.isWorkout && <Button.Group>
            <Button compact id='updatebutton' data-testid='updatebutton' className='button-style' type='button' 
              color={!isWorkout ? 'red' : 'black'} onClick={() => setIsWorkout(false)}>Update</Button>

            <Button compact id='workoutbutton' data-testid='workoutbutton' className='button-style' type='button' 
              color={isWorkout ? 'red' : 'black'} onClick={() => setIsWorkout(true)}>Workout</Button>
          </Button.Group>}

              {` `}

          {props.setShowNewpost && <Button compact data-testid='cancelbutton' id='cancelbutton' className='button-style' 
            color='red' floated='right' onClick={() => props.setShowNewpost(false)}>Cancel</Button>}

          {isWorkout && <Button compact id='didworkoutbutton' data-testid='didworkoutbutton' className='button-style' type='button' 
            color={didWorkout ? 'red' : 'black'} floated='right' onClick={() => setDidWorkout(!didWorkout)}>Did it?</Button>}
        </FlexDivRow>

      </FlexDivColumn>
    </Animation>
  )
}

const mapStateToProps = (state) => {
  return { 
    currentUser: state.currentUser 
  }
}

export default connect(mapStateToProps, { addNewToFeed, addWorkout })(Newpost)