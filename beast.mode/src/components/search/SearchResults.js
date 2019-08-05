import React from 'react'
import { connect } from 'react-redux'
import SearchResultUser from './SearchResultUser'
import SearchResultPost from './SearchResultPost'
import Spinner from '../Spinner'

const SearchResults = (props) => {
  if (props.search.results.length === 0) {
    return ( <div>Search did not find anything.</div> )
  }

  console.log(props.search)

  return ( <div>
    {props.search.results.map((result, i) => result.type 
      ? <SearchResultPost key={i} result={result} /> : <SearchResultUser key={i} result={result} /> )}
    {props.search.loading && <Spinner />}
  </div> )
}

const mapStateToProps = (state) => {
  return {
    search: state.search
  }
}

export default connect(mapStateToProps)(SearchResults)