import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { initAllWorkouts } from '../../reducers/workoutsReducer'
import { Input } from 'semantic-ui-react'
import { setSearchItems } from '../../reducers/searchResultsReducer'
import useField from '../../hooks/useField'
import Workout from './Workout'

const Workouts = (props) => {
  const [search, resetSearch] = useField('text')

  useEffect(() => {
    props.initAllWorkouts() // Add some kind of checking to avoid loading already loaded workouts
  }, [])

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
    <h3>Featured workouts</h3>
    <div>
      { props.workouts !== [] ? props.workouts.map(workout => <Workout key={workout._id} workout={workout} /> ) : null}
    </div>
  </div> )
}

const mapStateToProps = (state) => {
  return {
    workouts: state.workouts
  }
}

export default connect(mapStateToProps, { initAllWorkouts, setSearchItems })(withRouter(Workouts))