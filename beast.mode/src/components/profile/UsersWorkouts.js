import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initWorkouts } from '../../reducers/workoutsReducer'
import Workout from '../workout/Workout'

const UsersWorkouts = (props) => {
  useEffect(() => {
    props.initWorkouts(props.currentProfile.id)
  }, [])

  if (!props.workouts.length === 0) {
    return ( <div></div> )
  }

  return ( <div>
    {[ ...props.workouts].reverse().map(workout => <Workout key={workout._id} workout={workout} />)}
  </div> )
}

const mapStateToProps = (state) => {
  return {
    workouts: state.workouts,
    currentProfile: state.currentProfile
  }
}

export default connect(mapStateToProps, { initWorkouts })(UsersWorkouts)