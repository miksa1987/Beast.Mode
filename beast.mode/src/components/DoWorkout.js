import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Input } from 'semantic-ui-react'
import useTimer from '../hooks/useTimer'
import { 
  initCurrentWorkout,
  setCurrentWorkoutExercises,
  setCurrentWorkoutExerciseDone,
  setCurrentWorkoutTime,
  setCurrentWorkoutDone
} from '../reducers/currentWorkout'

import DoWorkoutOfSets from './DoWorkoutOfSets'

const DoWorkout = (props) => {
  const timer = useTimer(0)
  
  useEffect(() => {
    props.initCurrentWorkout(props.workoutid)
  }, [])

  if (props.currentWorkout.type === '1') {
    return ( <div>TBD</div> )
  }

  // Workout type 0 default
  return ( <div>
    <Button color='red' onClick={() => timer.start()}>Start this workout</Button>
    <Button color='green'>Mark this workout done</Button>
    <Button color='blue'>Edit this workout</Button>
    <DoWorkoutOfSets timer={timer}
      currentWorkout={props.currentWorkout} 
      setCurrentWorkoutExerciseDone={props.setCurrentWorkoutExerciseDone}
      setCurrentWorkoutDone={props.setCurrentWorkoutDone} />
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
  setCurrentWorkoutTime,
  setCurrentWorkoutDone
}

export default connect(mapStateToProps, mapDispatchToProps)(DoWorkout)