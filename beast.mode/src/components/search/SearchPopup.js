import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSearchResults, loadMoreResults } from '../../reducers/searchResultsReducer'
import useWindowSize from '../../hooks/useWindowSize'
import useOrientation from '../../hooks/useOrientation'

const SearchPopup = (props) => {
  const windowSize = useWindowSize()
  const orientation = useOrientation()

  const divStyle = {
    backgroundColor: 'white',
    border: '1px solid #aaaaaa',
    position: 'fixed',
    top: '75px',
    left: '175px',
    width: windowSize.width - 6 * 55 - 40
  }

  const mobileStyle = {
    backgroundColor: 'white',
    border: '1px solid #aaaaaa',
    position: 'fixed',
    top: '100px',
    left: '20px',
    width: windowSize.width - 40
  }

  const search = (type) => {
    props.setSearchResults(props.searchterm, type)
    props.resetSearch()
    window.scrollTo(0, 0)
  }

  if (props.searchterm === '') {
    return ( <div style={{ display: 'none' }}></div> )
  }

  return ( <div style={orientation === 'portrait' ? mobileStyle : divStyle}>
    <table>
      <tbody>
        <tr>
          <td>
            <Link to='/search' onClick={() => search('user')}>
              <div>Search for '{props.searchterm}' in users</div>
            </Link>
          </td>
        </tr>
        <tr>
          <td>
            <Link to='/search' onClick={() => search('post')}>
              <div>Search for '{props.searchterm}' in posts</div>
            </Link>
          </td>
        </tr>
        <tr>
          <td>
            <Link to='/search' onClick={() => search('workout')}>
              <div>Search for '{props.searchterm}' in workouts</div>
            </Link>
          </td>
        </tr>
        <tr>
          <td>
            <Link to='/search' onClick={() => search('doneworkout')}>
              <div>Search for '{props.searchterm}' in done workouts</div>
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  </div> )
}

export default connect(null, { setSearchResults, loadMoreResults })(SearchPopup)