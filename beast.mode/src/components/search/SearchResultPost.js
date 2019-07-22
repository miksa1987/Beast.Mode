import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Divider } from 'semantic-ui-react'
const SearchResultPost = (props) => {
  const divStyle = {
    width: '95%'
  }
  
  if(!props.result.content) {
    return ( <div></div> )
  }
  
  let uri = ''

  switch (props.result.type) {
    case 'post':
      uri = `/post/${props.result._id}`
      break
    case 'workout':
      uri = `/workout/${props.result._id}`
      break
    case 'doneworkout':
      uri = `/doneworkout/${props.result._id}`
      break
    default:
      uri = ''
  }

  return ( <div style={divStyle}>
    <Link to={uri}>
      <table>
        <tbody>
          <tr>
            <td>
              <Image size='small' src={props.result.picture !== '' ? props.result.picture
                : 'https://react.semantic-ui.com/images/wireframe/image.png'} />
            </td>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <h3>{props.result.user.username}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {props.result.content}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </Link>
    <Divider />
  </div> )
}

export default SearchResultPost