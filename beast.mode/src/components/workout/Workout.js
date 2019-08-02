import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Image, Divider } from 'semantic-ui-react'
import parser from '../../service/parser'
import './Workout.css'
import '../Animation.css'

const Workout = (props) => {
  // Get first lines from content
  const getExercises = () => {
    const lines = props.workout.content.split('\n')
    let exercises = []
    
    lines.forEach(line => {
      if (parser.isWorkout(line)) exercises.push(line)
    })

    const linesToReturn = lines.length > 8 ?
      lines.slice(0, 5) : lines.slice(0, lines.length/2+1)
      
    return [linesToReturn, lines.length]
  }

  const [exercises, exercisesNumber] = getExercises()

  if (!props.workout.content) {
    return ( <div>Loading</div> )
  }

  return ( <div className='workout-component fade-in-fast'>
    <table>
      <tbody>
        <tr>
          <td className='workout-image'>
            <Image width='130px' height='130px' src={props.workout.picture && props.workout.picture !== '' 
              ? props.workout.picture : 'https://react.semantic-ui.com/images/wireframe/image.png'} />
          </td>
          <td className='workout-info'>
            <table className='third'>
              <tbody>
                <tr>
                  <td>
                    <h3>WORKOUT BY {props.workout.user.username.toUpperCase()}</h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table className='third'>
                      <tbody>
                        <tr>
                          <td className='workout-segment first'>
                            <h2>{exercisesNumber}</h2>
                            exercises
                          </td>
                          <td className='workout-segment second'>
                            <h2>{props.workout.likes.length}</h2>
                            likes
                          </td>
                          <td className='workout-segment third'>
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
            <Button onClick={() => props.history.push(`/doworkout/${props.workout._id}`)}>
              View this workout
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  </div> )
}

export default withRouter(Workout)