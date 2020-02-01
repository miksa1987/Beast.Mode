import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSearchResults } from '../../reducers/searchResultsReducer'

const SearchPopupBase = styled.div`
  background-color: white;
  border: 1px solid #dddddd;
  border-radius: 4px;
  position: fixed;
  right: 135px;
  top: 45px;
  width: calc(100% - 5 * 60px - 25px - 8.5em);

  @media (max-width: 600px) {
    background-color: white;
    border: 1px solid #dddddd;
    position: fixed;
    left: 0px;
    top: 100px;
    width: 100%;
  }
`

const PopupItem = styled.div`
  border-radius: 5px;
  background-color: white;
  color: black;

  &:hover, active {
    border-radius: 5px;
    background-color: #000000;
    color: white;
  }
`

const SearchPopup = (props) => {
  const search = (type) => {
    props.setSearchResults(props.searchterm, type)
    props.resetSearch()
    window.scrollTo(0, 0)
  }

  if (props.searchterm === '') {
    return ( <div></div> )
  }

  return (
    <SearchPopupBase>
      <PopupItem>
        <Link to='/search' onClick={() => search('user')}>
          Search for '{props.searchterm}' in users
        </Link>
      </PopupItem>
      <PopupItem>
        <Link to='/search' onClick={() => search('post')}>
          Search for '{props.searchterm}' in posts
        </Link>
      </PopupItem>
      <PopupItem>
        <Link to='/search' onClick={() => search('workout')}>
          Search for '{props.searchterm}' in workouts
        </Link>
      </PopupItem>
      <PopupItem>
        <Link to='/search' onClick={() => search('doneworkout')}>
          Search for '{props.searchterm}' in done workouts
        </Link>
      </PopupItem>
    </SearchPopupBase>
  )
}

export default connect(null, { setSearchResults })(SearchPopup)