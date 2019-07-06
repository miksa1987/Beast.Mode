import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import useTimer from '../hooks/useTimer'

const DoWorkoutOfRounds = (props) => {
  const [current, setCurrent] = useState({ exercise: 0, set: 0 })
  const [currentReps, setCurrentReps] = useState(0)
  
  const timer = useTimer(0)
  const exerciseTimer = useTimer(0) 

  const setDone = () => {
    if(props.currentWorkout.done) return

    props.setCurrentWorkoutExerciseDone(current.exercise, current.set, currentReps)
    setCurrent({ ...current, set: current.set + 1 })
    setTimeout(() => { 
      if (current.set + 1 > props.currentWorkout.exercises[current.exercise].length - 1) {
        if (current.exercise  < props.currentWorkout.exercises.length - 1) {
          setCurrent({ exercise: current.exercise + 1, set: 0 })
        } else {
          props.setCurrentWorkoutDone()
        }
      }  
    }, 100)
  }

  if (props.currentWorkout.exercises.length === 0) {
    return ( <div>Loading...</div> )
  }

  return ( <div>
    <p>{props.timer.value}</p>
    <h2>Exercise {current.exercise + 1}</h2>
    <h3>GOAL:{props.currentWorkout.exercises[current.exercise].length} sets, 
      {' ' + props.currentWorkout.exercises[current.exercise][0].reps + ' '} reps per set</h3> 
    <ul>{props.currentWorkout.exercises[current.exercise].map((exercise, i) =>
      <li key={i}>{exercise.reps} {exercise.exercise}
    {exercise.done && <strong>DID {exercise.doneReps} reps!</strong>}</li>)} </ul>
      <strong>{currentReps} reps</strong>
    <Button.Group>
      <Button icon='left chevron' onClick={() => setCurrentReps(currentReps - 1)}></Button>
      <Button icon='right chevron'  onClick={() => setCurrentReps(currentReps + 1)}></Button>
    </Button.Group>
    <Button color='green' onClick={setDone}>Exercise done</Button>
  </div> )
}

export default DoWorkoutOfRounds