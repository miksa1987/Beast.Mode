import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'semantic-ui-react'
import SearchResult from './SearchResult'
import SearchResultBody from './SearchResultBody'

const SearchResultUser = (props) => {
  if(!props.result.username) {
    return ( <div></div> )
  }

  return ( 
    <div>
      <Link to={`/profile/${props.result.id}`}>
        <SearchResult>
          <Image size='tiny' src={props.result.picture !== '' ? props.result.picture
            : 'https://react.semantic-ui.com/images/wireframe/image.png'} />
          <SearchResultBody>
            <h3>{props.result.username}</h3>
            <p>{props.result.info}</p>
          </SearchResultBody>
        </SearchResult>
      </Link>
    </div> 
  )
}

export default SearchResultUser