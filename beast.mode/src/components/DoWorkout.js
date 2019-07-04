import React, { useState, useEffect } from 'react'
import communicationService from '../service/communication'
import parser from '../service/parser'

const DoWorkout = (props) => {
  const [workout, setWorkout] = useState({})

  const style = { 
    whiteSpace: 'pre-line'
  }

  const doWorkoutType0 = (exercises) => {

  }

  const doWorkoutType1 = (exercises) => {

  }

  useEffect(() => {
    // Gotta try to figure out cleaner way to do this.
    const fetchData = async () => {
      setWorkout(await communicationService.get(`/workouts/${props.workoutid}`))
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (workout.content) {
      let exercises = []
      const lines = workout.content.split('\n')

      lines.forEach(line => {
        if (parser.isWorkout(line)) exercises.push(line)
      })

      if (exercises.length > 0) {
        if (parser.match0(exercises[0])) doWorkoutType0(exercises)
        if (parser.match1(exercises[0])) doWorkoutType1(exercises)
      }
    }
  }, [workout])
  
  return ( <div style={style}>
    {workout.content}
  </div> )
}

export default DoWorkout