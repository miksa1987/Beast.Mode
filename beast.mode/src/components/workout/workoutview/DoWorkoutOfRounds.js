
import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import useTimer from '../../../hooks/useTimer'
import useWindowSize from '../../../hooks/useWindowSize'
import Timer from './Timer'
import parser from '../../../service/parser'

const DoWorkoutOfSets = (props) => {
  const [current, setCurrent] = useState({ exercise: 0, round: 0 })
  const [currentReps, setCurrentReps] = useState(5)
  
  console.log(current)
  const rows = props.currentWorkout.textcontent
    .split('\n')
    .filter(line => parser.match1(line))
    .filter(line => !parser.matchRounds(line))
  
  const window = useWindowSize()
  
  const setDone = () => {
    if(props.currentWorkout.done || !props.timer.active) return
    let newCurrent = { ...current, exercise: current.exercise + 1 }

    props.setCurrentWorkoutExerciseDone(currentReps, current.exercise)

    if (newCurrent.exercise > props.currentWorkout.exercises.length - 1) {
      console.log('check 1')
      if (newCurrent.round < props.currentWorkout.rounds - 1) {
        console.log('check 2')
        newCurrent = { round: current.round + 1, exercise: 0 }
      } else {
        props.setCurrentWorkoutDone()
        props.timer.stop()
        props.setView('done')
      }
    }
    console.log(newCurrent)
    setCurrent(newCurrent)
    
    console.log(`ex ${current.exercise} round ${current.round}`)
  }

  if (props.currentWorkout.exercises.length === 0) {
    return ( <div>Loading...</div> )
  }

  if (window.width < window.height) {
    return ( <div className='container'>
      <Timer secs={props.timer.value} />
      <h2>Round {current.round + 1}</h2>
      <h3>Exercise {current.exercise + 1}</h3>
      <h4>Now do at least {props.currentWorkout.exercises[current.exercise].reps} {props.currentWorkout.exercises[current.exercise].exercise}</h4>
      <h4>How many reps did you do? {currentReps} reps</h4>
      <Button.Group>
        <Button icon='left chevron' onClick={() => setCurrentReps(currentReps - 1)}></Button>
        <Button icon='right chevron'  onClick={() => setCurrentReps(currentReps + 1)}></Button>
      </Button.Group>
      <Button color='green' onClick={setDone}>Exercise done</Button>
    </div> )
  }

  return ( <div className='container'>
    <table className='container'>
      <tbody>
        <tr>
          <td className='sidebar-component'>
            <Timer secs={props.timer.value} />        
            {rows.map((row, i) => i === current.exercise ? <h2 key={i}>{row}</h2> : <h3 key={i}>{row}</h3>)}
          </td>
          <td className='view-component'>
            <h2>Round {current.round + 1}</h2>
            <h3>Exercise {current.exercise + 1}</h3>
            <h4>Now do at least {props.currentWorkout.exercises[current.exercise].reps} {props.currentWorkout.exercises[current.exercise].exercise}</h4>
            <h4>How many reps did you do? {currentReps} reps</h4>
            <Button.Group>
              <Button icon='left chevron' onClick={() => setCurrentReps(currentReps - 1)}></Button>
              <Button icon='right chevron'  onClick={() => setCurrentReps(currentReps + 1)}></Button>
            </Button.Group>
            <Button color='green' onClick={setDone}>Exercise done</Button>
          </td>
        </tr>
      </tbody>
    </table>
  </div> )
}

export default DoWorkoutOfSets