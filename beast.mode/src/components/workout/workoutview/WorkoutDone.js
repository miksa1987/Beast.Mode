import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import './Preview.css'

const WorkoutOfSetsDone = (props) => {
  const [file, setFile] = useState('')

  const submit = (event) => {
    event.preventDefault()
    
    const workout = {
      content: props.workout.textcontent,
      additional: props.workout.additional || '',
      time: props.time || 0
    }

    props.setDone(workout)
  }

  return ( <div className='preview-component'>
    <h1>Workout done!</h1>
    <h3>{props.workout.textcontent}</h3>
    <p>Want to save a picture with the workout?</p>
    <form onSubmit={submit}>
      <input type='file' onChange={({target}) => setFile(target.files[0])} />
      <Button type='submit'>Save done workout</Button>
    </form>
  </div>)
}

export default withRouter(WorkoutOfSetsDone)