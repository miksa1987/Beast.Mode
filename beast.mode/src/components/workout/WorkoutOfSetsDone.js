import React from 'react'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const WorkoutOfSetsDone = (props) => {

  return ( <div>
    <h1>Workout done!</h1>
    <Button onClick={() => props.history.push('/workouts')} color='green'>Back to workouts</Button>
  </div>)
}

export default withRouter(WorkoutOfSetsDone)