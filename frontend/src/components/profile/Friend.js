import React from 'react'
import { Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import '../Animation.css'

const Friend = (props) => {
  if (!props.friend) {
    return ( <div></div> )
  }

  const imgsource = props.friend.picture ? props.friend.picture : 'https://react.semantic-ui.com/images/wireframe/image.png'

  return ( <div className='element element2 fade-in-fast'>
    <Link to={`/profile/${props.friend.id}`}>
      <table className='top-align'>
        <tbody>
          <tr>
            <td>
              <Image src={imgsource} size='tiny' />
            </td>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <h3>{props.friend.username}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{props.friend.info}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </Link>
  </div> )
}

export default Friend