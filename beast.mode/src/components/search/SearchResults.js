import React from 'react'
import { connect } from 'react-redux'
import SearchResultUser from './SearchResultUser'
import SearchResultPost from './SearchResultPost'

const SearchResults = (props) => {
  if(props.search.results.length === 0 || !props.search.end) {
    return ( <div>Search did not find anything.</div> )
  }

  return ( <div>
    {props.searchResults.map(result => result.type 
      ? <SearchResultPost key={result._id} result={result} /> : <SearchResultUser key={result.id} result={result} /> )}
  </div> )
}

const mapStateToProps = (state) => {
  return {
    search: state.search
  }
}

export default connect(mapStateToProps)(SearchResults)