import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'
import './Search.css'


const SearchResult = (props) => {
  if(!props.result.username) {
    return ( <div></div> )
  }

  return ( <div className='search-result'>
    <Link to={`/profile/${props.result.id}`}>
      <table>
        <tbody>
          <tr>
            <td>
              <Image size='tiny' src={props.result.picture !== '' ? props.result.picture
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
  </div> )
}

export default SearchResult