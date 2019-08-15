import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import useWindowSize from '../../../hooks/useWindowSize'
import Timer from './Timer'
import parser from '../../../service/parser'
import './DoWorkout.css'

const DoWorkoutOfSets = (props) => {
  const [current, setCurrent] = useState({ exercise: 0, round: 0 })
  const [currentReps, setCurrentReps] = useState(5)
  
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
      if (newCurrent.round < props.currentWorkout.rounds - 1) {
        newCurrent = { round: current.round + 1, exercise: 0 }
      } else {
        props.timer.stop()
        props.setView('done')
      }
    }
    setCurrent(newCurrent)
  }

  if (props.currentWorkout.exercises.length === 0) {
    return ( <div>Loading...</div> )
  }

  if (window.width < window.height) {
    return ( <div className='container'>
      <table>
        <tbody>
          <tr>
            <td className='doworkout-component-mobile-tr'>
              <Timer secs={props.timer.value} />    
            </td>
          </tr>
          <tr>
            <td className='doworkout-component-mobile-tr'>
              <h2>Exercise {current.exercise + 1}</h2>
            </td>
          </tr>
          <tr>
            <td className='doworkout-component-mobile-tr'>
              <h4>Now do at least 
                {props.currentWorkout.exercises[current.exercise].reps} {props.currentWorkout.exercises[current.exercise].exercise}</h4>
            </td>
          </tr>
          <tr>
            <td className='doworkout-component-mobile-tr'>
              <h4>How many reps did you do? {currentReps} reps</h4>
            </td>
          </tr>
          <tr>
            <td className='doworkout-component-mobile-tr'>
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