import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'
import userHelper from '../util/userHelper';

const User = (props) => {
  const userStyle = {
    width: '30%'
  }

  const tableStyle = {
    width: '100%'
  }

  if (!userHelper.username) {
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
            <Link to={`/users/${props.user.id}`}><strong>{props.user.username}</strong></Link>
          </td>
        </tr>
      </tbody>
    </table>
  </div> )
}

export default User