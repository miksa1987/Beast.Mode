import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import useTimer from '../hooks/useTimer'
import Timer from './Timer'
import WorkoutOfSetsDone from './WorkoutOfSetsDone'

const DoWorkoutOfSets = (props) => {
  const [current, setCurrent] = useState({ exercise: 0, set: 0 })
  const [currentReps, setCurrentReps] = useState(5)
  
  // Soon...
  const exerciseTimer = useTimer(0) 

  const setDone = () => {
    if(props.currentWorkout.done || !props.timer.active) return

    props.setCurrentWorkoutExerciseDone(currentReps, current.exercise, current.set)
    setCurrent({ ...current, set: current.set + 1 })
    setTimeout(() => { 
      if (current.set + 1 > props.currentWorkout.exercises[current.exercise].length - 1) {
        if (current.exercise  < props.currentWorkout.exercises.length - 1) {
          setCurrent({ exercise: current.exercise + 1, set: 0 })
        } else {
          props.setCurrentWorkoutDone()
          props.timer.stop()
        }
      }  
    }, 25)
  }

  if (props.currentWorkout.exercises.length === 0) {
    return ( <div>Loading...</div> )
  }

  if (props.currentWorkout.done) {
    if (!props.currentWorkout.posted) props.setCurrentWorkoutDone()
    return ( <div>
      <WorkoutOfSetsDone currentWorkout={props.currentWorkout} />
    </div> )
  }
  return ( <div>
    <Timer secs={props.timer.value} />
    <h2>Exercise {current.exercise + 1}</h2>
    <h3>GOAL:{props.currentWorkout.exercises[current.exercise].length} sets, 
      {' ' + props.currentWorkout.exercises[current.exercise][0].reps + ' '} reps per set</h3> 
    <ul>{props.currentWorkout.exercises[current.exercise].map((exercise, i) =>
      <li key={i}>{exercise.reps} {exercise.exercise}
    {exercise.done && <strong>DID {exercise.doneReps} reps!</strong>}</li>)} </ul>
      <h4>How many reps did you do? {currentReps} reps</h4>
    <Button.Group>
      <Button icon='left chevron' onClick={() => setCurrentReps(currentReps - 1)}></Button>
      <Button icon='right chevron'  onClick={() => setCurrentReps(currentReps + 1)}></Button>
    </Button.Group>
    <Button color='green' onClick={setDone}>Exercise done</Button>
  </div> )
}

export default DoWorkoutOfSets