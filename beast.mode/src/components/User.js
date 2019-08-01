import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'
import './Users.css'
import './Animation.css'

const User = (props) => {
  if (!props.user.username) {
    return ( <div></div> )
  }

  return ( <div>
    <table className='user-tile-style fade-in-fast'>
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