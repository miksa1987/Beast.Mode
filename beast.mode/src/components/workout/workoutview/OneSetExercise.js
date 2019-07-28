import React from 'react'
import { Checkbox } from 'semantic-ui-react'

const OneSetExercise = (props) => {
  return ( <div><table><tbody><tr>
      <td><h3>{props.exercise}</h3></td><td><Checkbox /></td>
    </tr></tbody></table></div> )
}

export default OneSetExercise