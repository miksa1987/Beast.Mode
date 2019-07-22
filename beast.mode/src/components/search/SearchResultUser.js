import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Divider } from 'semantic-ui-react'

const SearchResult = (props) => {
  const divStyle = {
    width: '95%'
  }

  if(!props.result.username) {
    return ( <div></div> )
  }

  return ( <div style={divStyle}>
    <Link to={`/profile/${props.result.id}`}>
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
                      <h3>{props.result.username}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {props.result.info}
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

export default SearchResult