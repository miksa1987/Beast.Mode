import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'
import Timer from './Timer'
import HiddenOnMobile from '../../universal/HiddenOnMobile'
import HiddenOnDesktop from '../../universal/HiddenOnDesktop'
import parser from '../../../service/parser'

const Base = styled.div`
  display: grid;
  grid-template: 100% / 50% 50%;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`

const DoWorkoutOfSets = (props) => {
  const [current, setCurrent] = useState({ exercise: 0, round: 0 })
  const [currentReps, setCurrentReps] = useState(5)
  
  const rows = props.currentWorkout.textcontent
    .split('\n')
    .filter(line => parser.match1(line))
    .filter(line => !parser.matchRounds(line))

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

  return ( 
    <Base>
      <HiddenOnDesktop>
        <Timer secs={props.timer.value} />
        {rows.map((row, i) => i === current.exercise ? <h2 key={i}>{row}</h2> : <h3 key={i}>{row}</h3>)}
      </HiddenOnDesktop>
      <div>
        <h2>Round {current.round + 1}</h2>
        <h3>Exercise {current.exercise + 1}</h3>
        <h4>Now do at least {props.currentWorkout.exercises[current.exercise].reps} {props.currentWorkout.exercises[current.exercise].exercise}</h4>
        <h4>How many reps did you do? {currentReps} reps</h4>
        <Button.Group>
          <Button icon='left chevron' onClick={() => setCurrentReps(currentReps - 1)}></Button>
          <Button icon='right chevron'  onClick={() => setCurrentReps(currentReps + 1)}></Button>
        </Button.Group>
        <Button color='green' onClick={setDone}>Exercise done</Button>
      </div>
      <HiddenOnMobile>
        <Timer secs={props.timer.value} />
        {rows.map((row, i) => i === current.exercise ? <h2 key={i}>{row}</h2> : <h3 key={i}>{row}</h3>)}
      </HiddenOnMobile>
    </Base> 
  )
}

export default DoWorkoutOfSets