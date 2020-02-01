import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'
import SearchResult from './SearchResult'
import SearchResultBody from './SearchResultBody'

const SearchResultPost = (props) => {
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

  return ( 
    <div>
      <Link to={uri}>
        <SearchResult>
          <Image size='tiny' src={props.result.picture !== '' ? props.result.picture
            : 'https://react.semantic-ui.com/images/wireframe/image.png'} />
          <SearchResultBody>
            <h3>{props.result.user.username}</h3>
            <p>{props.result.content}</p>
          </SearchResultBody>
        </SearchResult>
      </Link>
    </div> 
  )
}

export default SearchResultPost