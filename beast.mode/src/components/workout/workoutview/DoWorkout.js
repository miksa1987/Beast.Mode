import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import useTimer from '../../../hooks/useTimer'
import { 
  initCurrentWorkout,
  setCurrentWorkoutExercises,
  setCurrentWorkoutExerciseDone,
  setCurrentWorkoutExerciseUndone,
  setCurrentWorkoutTime,
  setCurrentWorkoutDone
} from '../../../reducers/currentWorkout'
import useOrientation from '../../../hooks/useOrientation'

import Preview from './Preview'
import DoWorkoutOfSets from './DoWorkoutOfSets'
import DoWorkoutOfRounds from './DoWorkoutOfRounds'

import './DoWorkout.css'

const DoWorkout = (props) => {
  const timer = useTimer(0)
  const orientation = useOrientation()
  
  useEffect(() => {
    props.initCurrentWorkout(props.workoutid)
  }, [])

  // Workout type 0 default
  return ( <div className='doworkout-component'>
    {orientation === 'portrait' &&
    <Button.Group fluid>
      <Button color='red' compact onClick={() => timer.start()}>Start workout</Button>
      <Button color='green' compact onClick={() => props.setCurrentWorkoutDone()}>
        Workout done</Button>
      <Button color='blue' compact>Edit workout</Button>
    </Button.Group>}
    {orientation !== 'portrait' &&
    <Button.Group fluid>
      <Button color='red' onClick={() => timer.start()}>Start workout</Button>
      <Button color='green' onClick={() => props.setCurrentWorkoutDone()}>
        Mark workout done</Button>
      <Button color='blue'>Edit workout</Button>
    </Button.Group>}
    {!timer.active && <Preview workout={props.currentWorkout} />}
    {(props.currentWorkout.type === '0' && timer.active) && <DoWorkoutOfSets timer={timer}
      currentWorkout={props.currentWorkout} 
      setCurrentWorkoutExerciseDone={props.setCurrentWorkoutExerciseDone}
      setCurrentWorkoutDone={props.setCurrentWorkoutDone} />}
    {(props.currentWorkout.type === '1' && timer.active) && <DoWorkoutOfRounds timer={timer}
      currentWorkout={props.currentWorkout} 
      setCurrentWorkoutExerciseDone={props.setCurrentWorkoutExerciseDone}
      setCurrentWorkoutDone={props.setCurrentWorkoutDone}
      setCurrentWorkoutExerciseUndone={setCurrentWorkoutExerciseUndone} />}
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
  setCurrentWorkoutExerciseUndone,
  setCurrentWorkoutTime,
  setCurrentWorkoutDone
}

export default connect(mapStateToProps, mapDispatchToProps)(DoWorkout)