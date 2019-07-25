import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'
import useWindowSize from '../hooks/useWindowSize'

const User = (props) => {
  const windowSize = useWindowSize()

  const tableStyle = {
    width: '100%'
  }

  if (!props.user.username) {
    return ( <div></div> )
  }

  return ( <div>
    <table style={tableStyle}>
      <tbody>
        <tr>
          <td>
            <Image src={props.user.picture && props.user.picture !== '' ? 
              props.user.picture : 'https://react.semantic-ui.com/images/wireframe/image.png'} 
              size='medium' />
          </td>
        </tr>
        <tr>
          <td>
            <Link to={`/profile/${props.user.id}`}><strong>{props.user.username}</strong></Link>
          </td>
        </tr>
      </tbody>
    </table>
  </div> )
}

export default User