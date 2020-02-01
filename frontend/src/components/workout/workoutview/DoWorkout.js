import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
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

import Animation from '../../universal/Animation'
import Preview from './Preview'
import DoWorkoutOfSets from './DoWorkoutOfSets'
import DoWorkoutOfRounds from './DoWorkoutOfRounds'
import WorkoutDone from './WorkoutDone'

const Layout = styled.div`
  padding: 10px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  border: solid 1px#dddddd;
  border-radius: 4px;
  background-color: white;
  width: 100%;
`

const DoWorkout = (props) => {
  const timer = useTimer(0)
  const [view, setView] = useState('preview')
  
  useEffect(() => {
    props.initCurrentWorkout(props.workoutid)
  }, [])

  const start = () => {
    timer.start()
    setView('workout')
  }

  const markDone = () => {
    timer.stop()
    setView('done')
  }

  // Workout type 0 default
  return ( 
    <Animation>
      <Layout>
        {view === 'preview' ?
          <Button.Group>
            <Button color='red' onClick={start}>Start</Button>
            <Button color='green' onClick={markDone}>
            Mark done</Button>
          </Button.Group>
          : view !== 'done' && <Button color='green' onClick={markDone}>
          Mark done</Button>}

        {view === 'preview' && <Preview workout={props.currentWorkout} />}
        {view === 'done' && <WorkoutDone workout={props.currentWorkout} time={timer.value} setDone={props.setCurrentWorkoutDone} />}

        {(props.currentWorkout.type === '0' && timer.active) && <DoWorkoutOfSets timer={timer}
          currentWorkout={props.currentWorkout} 
          setCurrentWorkoutExerciseDone={props.setCurrentWorkoutExerciseDone}
          setView={setView} />}

        {(props.currentWorkout.type === '1' && timer.active) && <DoWorkoutOfRounds timer={timer}
          currentWorkout={props.currentWorkout} 
          setCurrentWorkoutExerciseDone={props.setCurrentWorkoutExerciseDone}
          setCurrentWorkoutExerciseUndone={setCurrentWorkoutExerciseUndone}
          setView={setView} />}
      </Layout> 
    </Animation>
  )
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