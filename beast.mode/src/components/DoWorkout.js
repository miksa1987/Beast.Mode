import React, { useState, useEffect } from 'react'
import Exercise from './Exercise'
import OneSetExercise from './OneSetExercise'
import communicationService from '../service/communication'
import parser from '../service/parser'

const DoWorkout = (props) => {
  const [workout, setWorkout] = useState({})

  useEffect(() => {
    // Gotta try to figure out cleaner way to do this. Maybe.
    const fetchData = async () => {
      const workout = await communicationService.get(`/workouts/${props.workoutid}`)
      if(workout.content !== undefined) setWorkout(parser.doWorkout(workout.content))
    }
    fetchData()
  })
  
  return ( <div>
    {workout.done}
  </div> )
}

export default DoWorkout