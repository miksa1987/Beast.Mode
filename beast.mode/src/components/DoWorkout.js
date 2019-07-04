import React, { useState, useEffect } from 'react'
import Exercise from './Exercise'
import OneSetExercise from './OneSetExercise'
import communicationService from '../service/communication'
import parser from '../service/parser'

const DoWorkout = (props) => {
  const [workout, setWorkout] = useState({})
  const [parsedWorkout, setParsedWorkout] = useState({ type: '' })

  const style = { 
    whiteSpace: 'pre-line'
  }

  const doWorkoutType0 = (exercises) => {
    let readyWorkout = { type: '0', exercises: [] }

    exercises.forEach(line => {
      const splits = line.split('x')
      let sets = []
      if(splits.length === 2) {
        for (let i = 0; i < Number(splits[0]); i++) {
          sets.push(splits[1])
        }
      }
      console.log(`sets ${sets}`)
      sets = sets.map((set, i) => <Exercise key={i} exercise={set} />)
      readyWorkout.exercises.push(sets)
    })
    console.log(readyWorkout)
    return readyWorkout
  }

  // Thought this was going to be longer but....
  const doWorkoutType1 = (exercises, rounds) => {
    let readyWorkout = { type: '1', exercises, rounds }
    readyWorkout.exercises = readyWorkout.exercises.map((ex, i) => <OneSetExercise key={i} exercise={ex} />)
    return readyWorkout
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
        if (parser.isWorkout(line) && !(line.includes('rounds'))) exercises.push(line)
      })

      if (exercises.length > 0) {
        console.log('workout parsing')
        if (parser.match0(exercises[0])) {
          console.log('type 0')
          setParsedWorkout(doWorkoutType0(exercises))
          console.log(parsedWorkout)
        }
        if (parser.match1(exercises[0])) {
          console.log('type 1')
          const rounds = lines.find(line => parser.matchRounds(line))
          setParsedWorkout(doWorkoutType1(exercises, rounds))
        }
      }
    }
    console.log(parsedWorkout)
  }, [workout])
  
  if(parsedWorkout.type === '0') {
    return ( <div>
      {parsedWorkout.exercises.map((exercise, i) => 
        <div><h3 key={i}>Exercise {i+1}</h3>{exercise}</div>
      )}
    </div> )
  }
  if(parsedWorkout.type === '1') {
    return ( <div>
      <h4>{parsedWorkout.exercises}</h4>
      <p>{parsedWorkout.rounds}</p>
    </div> )
  }
  return ( <div style={style}>
    {workout.content}
  </div> )
}

export default DoWorkout