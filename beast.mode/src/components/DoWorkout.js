import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Input } from 'semantic-ui-react'
import useTimer from '../hooks/useTimer'
import { 
  initCurrentWorkout,
  setCurrentWorkoutExercises,
  setCurrentWorkoutExerciseDone,
  setCurrentWorkoutExerciseUndone,
  setCurrentWorkoutTime,
  setCurrentWorkoutDone
} from '../reducers/currentWorkout'

import DoWorkoutOfSets from './DoWorkoutOfSets'
import DoWorkoutOfRounds from './DoWorkoutOfRounds'

const DoWorkout = (props) => {
  const timer = useTimer(0)
  
  useEffect(() => {
    props.initCurrentWorkout(props.workoutid)
  }, [])

  // Workout type 0 default
  return ( <div>
    <Button color='red' onClick={() => timer.start()}>Start this workout</Button>
    <Button color='green'>Mark this workout done</Button>
    <Button color='blue'>Edit this workout</Button>
    {props.currentWorkout.type === '0' && <DoWorkoutOfSets timer={timer}
      currentWorkout={props.currentWorkout} 
      setCurrentWorkoutExerciseDone={props.setCurrentWorkoutExerciseDone}
      setCurrentWorkoutDone={props.setCurrentWorkoutDone} />}
    {props.currentWorkout.type === '1' && <DoWorkoutOfRounds timer={timer}
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