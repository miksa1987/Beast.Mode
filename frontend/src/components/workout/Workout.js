import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Button, Image } from 'semantic-ui-react'
import styled from 'styled-components'
import parser from '../../service/parser'
import Animation from '../Animation'

const Base = styled.div`
  display: grid;
  grid-template: 2rem 9.3rem 2rem / 100%;
  background-color: #ffffff;
  margin: 10px 5px;
  border: 1px solid #dddddd;
`

const Columns = styled.div`
  display: grid;
  padding: 10px;
  grid-template: 100% / 5rem 5rem 5rem 1fr;
  grid-gap: 5px;
`

const ViewWorkoutLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.15);
`

const Workout = (props) => {
  const getExercises = () => {
    const lines = props.workout.content.split('\n')
    let exercises = []
    
    lines.forEach(line => {
      if (parser.isWorkout(line)) exercises = exercises.concat(line)
    })

    const linesToReturn = exercises.length > 8 ?
      exercises.slice(0, 5) : exercises.slice(0, exercises.length/2+1)
      
    return [linesToReturn, exercises.length]
  }

  const [exercises, exercisesNumber] = getExercises()

  if (!props.workout.content) {
    return ( <div>Loading</div> )
  }

  return (
    <Animation>
      <Base data-testid='workout-component'>
        <h3>WORKOUT BY {props.workout.user?.username?.toUpperCase()}</h3>

        <Columns>
          <Image size='tiny' rounded src={props.workout.picture && props.workout.picture !== '' 
            ? props.workout.picture : '/img/workout.jpg'} />

          <div>
            <h2>{exercisesNumber}</h2>
            exercises
          </div>

          <div>
            <h2>{props.workout.likes.length}</h2>
            likes
          </div>
          
          <div>
            {exercises.map((exercise, i) => <p key={i}>{exercise}</p>)}
          </div>
        </Columns>

        <ViewWorkoutLink>
          <Link to={`/doworkout/${props.workout._id}`}>
            <strong>View this workout</strong>
          </Link>
        </ViewWorkoutLink>
        
      </Base>
    </Animation>
  )
}

export default withRouter(Workout)