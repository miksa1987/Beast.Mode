import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initDoneWorkouts } from '../../reducers/doneWorkoutsReducer'
import Post from '../post/Post'

const UsersDoneWorkouts = (props) => {
  useEffect(() => {
    props.initDoneWorkouts(props.currentProfile.id)
  }, [])

  if (!props.doneWorkouts.length === 0) {
    return ( <div></div> )
  }

  return ( <div>
    {props.doneWorkouts.map(doneWorkout => <Post key={doneWorkout._id} post={doneWorkout} />)}
  </div> )
}

const mapStateToProps = (state) => {
  return {
    doneWorkouts: state.doneWorkouts,
    currentProfile: state.currentProfile
  }
}

export default connect(mapStateToProps, { initDoneWorkouts })(UsersDoneWorkouts)