import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initAllWorkouts } from '../../reducers/workoutsReducer'
import useOrientation from './../../hooks/useOrientation'
import Workout from './Workout'
import Sidebar from './Sidebar'
import Searchbar from './Searchbar'
import './Workouts.css'

const Workouts = (props) => {
  const orientation = useOrientation()

  useEffect(() => {
    props.initAllWorkouts() // Add some kind of checking to avoid loading already loaded workouts
  }, [])
  
  return ( <div className={orientation === 'portrait' ? null : 'workouts-component'}>
    {orientation === 'portrait' && <Searchbar /> }
    <h3>Featured workouts</h3>
    {props.workouts !== [] ? props.workouts.map(workout => <Workout key={workout._id} workout={workout} /> ) : null}
    {orientation !== 'portrait' && <Sidebar currentUser={props.currentUser} />}
  </div> )
}

const mapStateToProps = (state) => {
  return {
    workouts: state.workouts,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { initAllWorkouts })(Workouts)