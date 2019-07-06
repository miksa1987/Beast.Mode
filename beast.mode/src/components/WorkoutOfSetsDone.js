import React from 'react'

const WorkoutOfSetsDone = (props) => {
  if (props.currentWorkout.exercises.length === 0) {
    return ( <div>Loading...</div> )
  }

  return ( <div>
    <h1>Workout done!</h1>
    {props.currentWorkout.exercises.map((exercise, i) => 
      <div key={i}><h3>Exercise {i+1}</h3>
        {exercise[i].map((set, i) => <p>{set.exercise}, you did {set.doneReps} reps</p>)}
      </div>)}
  </div>)
}

export default WorkoutOfSetsDone