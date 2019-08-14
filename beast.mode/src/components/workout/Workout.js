import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Image } from 'semantic-ui-react'
import parser from '../../service/parser'
import useWindowSize from '../../hooks/useWindowSize'
import './Workout.css'
import '../Animation.css'

const Workout = (props) => {
  const screen = useWindowSize()

  // Get first lines from content
  const getExercises = () => {
    const lines = props.workout.content.split('\n')
    let exercises = []
    
    lines.forEach(line => {
      console.log(`line ${line} ${parser.isWorkout(line)}`)
      if (parser.isWorkout(line)) exercises = exercises.concat(line)
    })

    const linesToReturn = exercises.length > 8 ?
      exercises.slice(0, 5) : exercises.slice(0, exercises.length/2+1)
      
    return [linesToReturn, exercises.length]
  }

  const moveToWorkout = () => {
    props.history.push(`/doworkout/${props.workout._id}`)
    window.scrollTo(0, 0)
  }

  const [exercises, exercisesNumber] = getExercises()

  if (!props.workout.content) {
    return ( <div>Loading</div> )
  }

  return ( <div data-testid='workout-component' className='workout-component fade-in-fast'>
    <table className='third'>
      <tbody>
        <tr>
          {screen.width > screen.height && <td className='workout-image'>
            <Image size='tiny' rounded src={props.workout.picture && props.workout.picture !== '' 
              ? props.workout.picture : '/img/workout.jpg'} />
          </td>}

          <td className='workout-info'>
            <table className='third'>
              <tbody>
                <tr>
                  <td data-testid='workout-title'>
                    <h3>WORKOUT BY {props.workout.user.username.toUpperCase()}</h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table className='third'>
                      <tbody>
                        <tr>
                          <td data-testid='workout-exnumber' className='workout-segment first'>
                            <h2>{exercisesNumber}</h2>
                            exercises
                          </td>
                          <td data-testid='workout-likes' className='workout-segment second'>
                            <h2>{props.workout.likes.length}</h2>
                            likes
                          </td>
                          <td data-testid='workout-exercises' className='workout-segment third'>
                            <ul>
                              {exercises.map((exercise, i) => <li key={i}>{exercise}</li>)}
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td className='workout-button'>
            <Button data-testid='viewworkoutbutton' id='viewworkoutbutton' floated='right' 
              onClick={moveToWorkout}>
              View
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  </div> )
}

export default withRouter(Workout)