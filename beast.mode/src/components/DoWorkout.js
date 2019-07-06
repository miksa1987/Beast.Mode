import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Input } from 'semantic-ui-react'

import { 
  initCurrentWorkout,
  setCurrentWorkoutExercises,
  setCurrentWorkoutExerciseDone,
  setCurrentWorkoutTime
} from '../reducers/currentWorkout'

const DoWorkout = (props) => {
  const [current, setCurrent] = useState({ exercise: 0, set: 0 })
  const [currentReps, setCurrentReps] = useState(0)

  useEffect(() => {
    props.initCurrentWorkout(props.workoutid)
  }, [])
  console.log(props.currentWorkout.exercises[0])

  if (props.currentWorkout.exercises.length === 0) {
    return ( <div>Loading...</div> )
  }

  if (props.currentWorkout.type === '1') {
    return ( <div>TBD</div> )
  }

  return ( <div>
    <Button color='red'>Start this workout</Button>
    <Button color='green'>Mark this workout done</Button>
    <Button color='blue'>Edit this workout</Button>
    <h2>Exercise {current.exercise + 1}</h2>
    <h3>{props.currentWorkout.exercises[current.exercise].length} sets, 
      {' ' + props.currentWorkout.exercises[current.exercise][0].reps + ' '} reps per set</h3> 
    <ul>{props.currentWorkout.exercises[current.exercise].map((exercise, i) =>
      <li key={i}>{exercise.reps} {exercise.exercise}
      {i === current.set && <strong>CURRENT</strong>}</li>)} </ul>
    <strong>{currentReps} reps</strong>
    <Button.Group>
      <Button icon='left chevron' onClick={() => setCurrentReps(currentReps - 1)}></Button>
      <Button icon='right chevron'  onClick={() => setCurrentReps(currentReps + 1)}></Button>
    </Button.Group>
    <Button color='green' onClick={() => setCurrent({ ...current, set: current.set + 1})}>Exercise done</Button>
  </div> )
}

const mapStateToProps = (state) => {
  return {
    currentWorkout: state.currentWorkout,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = { 
  initCurrentWorkout,
  setCurrentWorkoutExercises,
  setCurrentWorkoutExerciseDone,
  setCurrentWorkoutTime
}

export default connect(mapStateToProps, mapDispatchToProps)(DoWorkout)