import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import useTimer from '../../hooks/useTimer'
import WorkoutofSetsDone from './WorkoutOfSetsDone'

const DoWorkoutOfRounds = (props) => {
  const [current, setCurrent] = useState(1)
  const [currentReps, setCurrentReps] = useState(5)
  
  // Soon...
  const exerciseTimer = useTimer(0) 

  const setRoundDone = () => {
    setCurrent(current + 1)
  }

  const setWorkoutDone = () => {
    props.setCurrentWorkoutDone()
  }

  if (props.currentWorkout.exercises.length === 0) {
    return ( <div>Loading...</div> )
  }

  if (props.currentWorkout.done) {
    if (!props.currentWorkout.posted) props.setCurrentWorkoutDone()
    return ( <div><WorkoutofSetsDone /></div> )
  }

  return ( <div>
    <p>{props.timer.value}</p>
    <h2>Round {current}</h2>
    <h3>GOAL:{props.currentWorkout.rounds} rounds</h3> 
    <ul>{props.currentWorkout.exercises.map((exercise, i) =>
      <li key={i}>{exercise.reps} {exercise.exercise}
    {exercise.done && <strong>DID {exercise.doneReps} reps!</strong>}</li>)} </ul>

    <Button color='blue' onClick={setRoundDone}>Round done</Button>
    <Button color='green' onClick={setWorkoutDone}>Workout done</Button>
  </div> )
}

export default DoWorkoutOfRounds