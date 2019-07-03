import React, { useState, useEffect } from 'react'
import communicationService from '../service/communication'

const DoWorkout = (props) => {
  const [workout, setWorkout] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      setWorkout(await communicationService.get(`/workouts/${props.workoutid}`))
    }
    fetchData()
  }, [])
  
  return ( <div>
    {workout.content}
    <h3>TOIMMIII</h3>
  </div> )
}

export default DoWorkout