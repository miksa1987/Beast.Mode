import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'
import './Users.css'
import './Animation.css'
import './Global.css'

const User = (props) => {
  if (!props.user.username) {
    return ( <div></div> )
  }

  return ( <div className='element'> 
    <Link to={`/profile/${props.user.id}`}>    
      <table className='user-tile-style no-padding fade-in-fast'>
        <tbody>
          <tr>
            <td>
              <Image className='no-padding' src={props.user.picture && props.user.picture !== '' ? 
                props.user.picture : 'https://react.semantic-ui.com/images/wireframe/image.png'} 
                size='medium' data-testid='user-picture' />
            </td>
          </tr>
          <tr>
            <td>
              <strong data-testid='user-username'>{props.user.username}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </Link>
  </div> )
}

export default User