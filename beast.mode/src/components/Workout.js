import React from 'react'
import { Button, Image, Divider } from 'semantic-ui-react'

const Workout = (props) => {
  if (!props.workout.content) {
    return ( <div>Loading</div> )
  }

  return ( <div>
    <table>
      <tbody>
        <tr>
          <td>
            <Image size='big' src={props.workout.picture && props.workout.picture !== '' 
              ? props.workout.picture : 'https://react.semantic-ui.com/images/wireframe/image.png'} />
          </td>
          <td>

          </td>
          <td>
            <Button onClick={() => props.history.push(`/doworkout/${props.post._id}`)}>
              Do this workout
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
    
  </div> )
}

export default Workout