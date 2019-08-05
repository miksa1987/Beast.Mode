import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSearchResults } from '../../reducers/searchResultsReducer'
import useWindowSize from '../../hooks/useWindowSize'
import useOrientation from '../../hooks/useOrientation'
import './Search.css'

const SearchPopup = (props) => {
  const windowSize = useWindowSize()
  const orientation = useOrientation()

  const search = (type) => {
    props.setSearchResults(props.searchterm, type)
    props.resetSearch()
    window.scrollTo(0, 0)
  }

  if (props.searchterm === '') {
    return ( <div style={{ display: 'none' }}></div> )
  }

  return ( <div className='search-popup'>
    <table className='full-width'>
      <tbody>
        <tr>
          <td className='popup-menu-item full-width'>
            <Link to='/search' onClick={() => search('user')}>
              <div>Search for '{props.searchterm}' in users</div>
            </Link>
          </td>
        </tr>
        <tr>
          <td className='popup-menu-item full-width'>
            <Link to='/search' onClick={() => search('post')}>
              <div>Search for '{props.searchterm}' in posts</div>
            </Link>
          </td>
        </tr>
        <tr>
          <td className='popup-menu-item full-width'>
            <Link to='/search' onClick={() => search('workout')}>
              <div>Search for '{props.searchterm}' in workouts</div>
            </Link>
          </td>
        </tr>
        <tr>
          <td className='popup-menu-item full-width'>
            <Link to='/search' onClick={() => search('doneworkout')}>
              <div>Search for '{props.searchterm}' in done workouts</div>
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  </div> )
}

export default connect(null, { setSearchResults })(SearchPopup)