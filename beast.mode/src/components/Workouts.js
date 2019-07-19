import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { initAllWorkouts } from '../reducers/workoutsReducer'
import { Input } from 'semantic-ui-react'

import Workout from './Workout'

const feedStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start'
}

const Workouts = (props) => {
  const [searchterm, setSearchterm] = useState('')

  useEffect(() => {
    props.initAllWorkouts() // Add some kind of checking to avoid loading already loaded workouts
  }, [])

  const search = (event) => {
    event.preventDefault()
    console.log(searchterm)
  }
  
  return ( <div>
    <h3>Find workouts...<br/></h3>
    <form onSubmit={search}>
      <Input fluid size='small' action={{icon: 'search'}} name='workoutSearch' onChange={ ({ target }) => setSearchterm(target.value) } />
    </form>
    <h3>Featured workouts</h3>
    <div style={feedStyle}>
      { props.workouts !== [] ? props.workouts.map(workout => <Workout key={workout._id} workout={workout} /> ) : null}
    </div>
  </div> )
}

const mapStateToProps = (state) => {
  return {
    workouts: state.workouts
  }
}

export default connect(mapStateToProps, { initAllWorkouts })(Workouts)