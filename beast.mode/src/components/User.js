import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'

const User = (props) => {
  const userStyle = {
    width: '30%'
  }

  const tableStyle = {
    width: '100%'
  }

  if (!props.user.username) {
    return ( <div></div> )
  }

  return ( <div style={userStyle}>
    <table style={tableStyle}>
      <tbody>
        <tr>
          <td>
            <Image src={props.user.picture && props.user.picture !== '' ? 
              props.user.picture : 'https://react.semantic-ui.com/images/wireframe/image.png'} />
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