import React from 'react'
import { Checkbox } from 'semantic-ui-react'

const Exercise = (props) => {
  return ( <div><table><tbody><tr>
      <td><p>{props.exercise}</p></td><td><Checkbox /></td>
    </tr></tbody></table></div> )
}

export default Exercise