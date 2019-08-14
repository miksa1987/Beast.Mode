import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import useTimer from '../../../hooks/useTimer'
import { 
  initCurrentWorkout,
  setCurrentWorkoutExercises,
  setCurrentWorkoutExerciseDone,
  setCurrentWorkoutExerciseUndone,
  setCurrentWorkoutDone
} from '../../../reducers/currentWorkout'

import Preview from './Preview'
import DoWorkoutOfSets from './DoWorkoutOfSets'
import DoWorkoutOfRounds from './DoWorkoutOfRounds'
import WorkoutDone from './WorkoutDone'

import './DoWorkout.css'
import '../../Animation.css'

const DoWorkout = (props) => {
  const timer = useTimer(0)
  const [view, setView] = useState('preview')
  
  useEffect(() => {
    props.initCurrentWorkout(props.workoutid)
  }, [])

  console.log(props.currentWorkout)
  const start = () => {
    timer.start()
    setView('workout')
  }
  // Workout type 0 default
  return ( <div className='doworkout-component fade-in-fast'>
    {view === 'preview' ?
    <Button.Group>
      <Button color='red' onClick={start}>Start</Button>
      <Button color='green' onClick={() => setView('done')}>
        Mark done</Button>
    </Button.Group>
    : view !== 'done' && <Button color='green' onClick={() => props.setCurrentWorkoutDone()}>
      Mark done</Button>}

    {view === 'preview' && <Preview workout={props.currentWorkout} />}
    {view === 'done' && <WorkoutDone workout={props.currentWorkout} time={timer.value} setDone={props.setCurrentWorkoutDone} />}

    {(props.currentWorkout.type === '0' && timer.active) && <DoWorkoutOfSets timer={timer}
      currentWorkout={props.currentWorkout} 
      setCurrentWorkoutExerciseDone={props.setCurrentWorkoutExerciseDone}
      setCurrentWorkoutDone={props.setCurrentWorkoutDone}
      setView={setView} />}

    {(props.currentWorkout.type === '1' && timer.active) && <DoWorkoutOfRounds timer={timer}
      currentWorkout={props.currentWorkout} 
      setCurrentWorkoutExerciseDone={props.setCurrentWorkoutExerciseDone}
      setCurrentWorkoutDone={props.setCurrentWorkoutDone}
      setCurrentWorkoutExerciseUndone={setCurrentWorkoutExerciseUndone}
      setView={setView} />}
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
  setCurrentWorkoutDone
}

export default connect(mapStateToProps, mapDispatchToProps)(DoWorkout)