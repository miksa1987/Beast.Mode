import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initWorkouts } from '../../reducers/workoutsReducer'
import Post from '../Post'
import Workout from '../Workout'

const UsersWorkouts = (props) => {
  useEffect(() => {
    props.initWorkouts(props.currentProfile.id)
  }, [])

  if (!props.workouts.length === 0) {
    return ( <div></div> )
  }

  return ( <div>
    {props.workouts.map(workout => <Post key={workout._id} post={workout} />)}
  </div> )
}

const mapStateToProps = (state) => {
  return {
    workouts: state.workouts,
    currentProfile: state.currentProfile
  }
}

export default connect(mapStateToProps, { initWorkouts })(UsersWorkouts)