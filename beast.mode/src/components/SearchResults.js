import React from 'react'
import { connect } from 'react-redux'

const SearchResults = (props) => {
  return ( <div>
    ...
  </div> )
}

const mapStateToProps = (state) => {
  searchResults: state.searchResults
}

export default connect(mapStateToProps)(SearchResults)