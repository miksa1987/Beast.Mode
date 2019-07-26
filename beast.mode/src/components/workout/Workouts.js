import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initAllWorkouts } from '../../reducers/workoutsReducer'
import useOrientation from './../../hooks/useOrientation'
import Workout from './Workout'
import Sidebar from './Sidebar'
import MobileSelection from './MobileSelection'
import './Workouts.css'
import { Button } from 'semantic-ui-react';

const Workouts = (props) => {
  const orientation = useOrientation()

  useEffect(() => {
    props.initAllWorkouts() // Add some kind of checking to avoid loading already loaded workouts
  }, [])
  
  return ( <div className={orientation === 'portrait' ? null : 'workouts-component'}>
    {orientation === 'portrait' && <MobileSelection currentUser={props.currentUser} /> }
    <Button fluid color='blue'>Create new workout</Button>
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