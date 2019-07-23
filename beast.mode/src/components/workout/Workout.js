import React from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Image, Divider } from 'semantic-ui-react'
import parser from '../../service/parser'

const Workout = (props) => {
  const elementStyle = {
    width: '98%'
  }

  const imgStyle = {
    width: '20%'
  }

  const infoStyle = {
    verticalAlign: 'top',
    width: '75%'
  }

  const buttonStyle = {
    width: '100%'
  }

  const segmentStyle = {
    whiteSpace: 'pre-line',
    lineBreak: 'strict',
    verticalAlign: 'top',
    padding: '10px 10px 10px 10px'
  }

  console.log(props.workout)
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

  return ( <div style={elementStyle}>
    <table>
      <tbody>
        <tr>
          <td style={imgStyle}>
            <Image width='130px' height='130px' src={props.workout.picture && props.workout.picture !== '' 
              ? props.workout.picture : 'https://react.semantic-ui.com/images/wireframe/image.png'} />
          </td>
          <td style={infoStyle}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <h3>WORKOUT BY {props.workout.user.username.toUpperCase()}</h3>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table>
                      <tbody>
                        <tr>
                          <td style={segmentStyle}>
                            <h2>{exercisesNumber}</h2>
                            exercises
                          </td>
                          <td style={segmentStyle}>

                          </td>
                          <td style={segmentStyle}>
                            {exercises}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td style={buttonStyle}>
            <Button onClick={() => props.history.push(`/doworkout/${props.workout._id}`)}>
              View this workout
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
    <Divider />
  </div> )
}

export default withRouter(Workout)