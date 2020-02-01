import React, { useState } from 'react'
import { Button, Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import FileInput from '../../universal/FileInput'
import './Preview.css'
import '../../Animation.css'

const WorkoutOfSetsDone = (props) => {
  const [file, setFile] = useState('')
  const [image, setImage] = useState('')

  const submit = (event) => {
    event.preventDefault()
    
    const workout = {
      content: props.workout.textcontent,
      additional: props.workout.additional || '',
      time: props.time || 0,
      picture: image
    }

    props.setDone(workout)
    // Should probably do this with localstorage for memory, to update the uri **FACEPALM**
    props.history.goBack()
  }

  return ( <div className='preview-component fade-in-fast'>
    <Image src={image ? image 
      : 'https://react.semantic-ui.com/images/wireframe/image.png'} floated='right' size='tiny' rounded />
    <h1>Workout done!</h1>
    <h3>{props.workout.textcontent}</h3>
    <p>Want to save a picture with the workout?</p>
    <form onSubmit={submit}>
              <FileInput file={file} setFile={setFile} setImage={setImage} compact />
              <Button id='workoutdone-savebutton' color='green' type='submit'>Save done workout</Button>
    </form>
  </div>)
}

export default withRouter(WorkoutOfSetsDone)