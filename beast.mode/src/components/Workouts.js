import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { initWorkouts } from '../reducers/workoutsReducer'
import { Input } from 'semantic-ui-react'
import Post from './Post'

const feedStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start'
}

const Workouts = (props) => {
  const [searchterm, setSearchterm] = useState('')

  useEffect(() => {
    if (props.workouts.length === 0) props.initWorkouts()
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
      { props.workouts !== [] ? props.workouts.map(workout => <Post key={workout._id} post={workout} /> ) : null}
    </div>
  </div> )
}

const mapStateToProps = (state) => {
  return {
    workouts: state.workouts
  }
}

export default connect(mapStateToProps, { initWorkouts })(Workouts)