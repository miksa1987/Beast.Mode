import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { initWorkouts } from '../reducers/workoutsReducer'
import Workout from './Workout'


const feedStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start'
}

const Workouts = (props) => {
  const [search, setSearch] = useState('')

  const style = {
    whiteSpace: 'pre-line'
  }  

  useEffect(() => {
    props.initWorkouts()
  }, [])
  
  return ( <div>
    <strong>Find workouts...<br/></strong>
    <form>
      <input name='workoutSearch' onChange={ ({ target }) => setSearch(target.value) } />
      <button type='submit'>Find</button>
    </form>
    <div style={feedStyle}>
      { props.workouts !== [] ? props.workouts.map(workout => <Workout key={workout._id} post={workout} /> ) : null}
    </div>
  </div> )
}

const mapStateToProps = (state) => {
  return {
    workouts: state.workouts
  }
}

export default connect(mapStateToProps, { initWorkouts })(Workouts)