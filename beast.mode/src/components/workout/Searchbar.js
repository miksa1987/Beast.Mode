import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Input } from 'semantic-ui-react'
import useField from '../../hooks/useField'
import { setSearchItems } from '../../reducers/searchResultsReducer'

const Searchbar = (props) => {
  const [search, resetSearch] = useField('text')

  const doSearch = (event) => {
    event.preventDefault()
    props.setSearchItems(search.value, 'workout')
    props.history.push('/search')
    resetSearch()
  }

  return ( <div>
    <form onSubmit={doSearch}>
      <Input fluid size='small' { ...search } placeholder='Find workouts...' />
    </form>
  </div>)
}

export default connect(null, { setSearchItems })(withRouter(Searchbar))