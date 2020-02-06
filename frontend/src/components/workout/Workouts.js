import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { initAllWorkouts } from '../../reducers/workoutsReducer'
import useWindowSize from './../../hooks/useWindowSize'
import Workout from './Workout'
import MobileSelection from './MobileSelection'
import Newpost from '../post/Newpost'
import './Workouts.css'
import { Button } from 'semantic-ui-react'
import Spinner from '../Spinner'

// export for testing
export const Workouts = (props) => {
  const [showNewpost, setShowNewpost] = useState(false)

  useEffect(() => {
    props.initAllWorkouts() // Add some kind of checking to avoid loading already loaded workouts
  }, [])

  if (props.workouts.length === 0) {
    return ( <div><Newpost setShowNewpost={setShowNewpost} isWorkout={true} /><Spinner /></div> )
  }
  
  return ( 
    <div>
      <MobileSelection currentUser={props.currentUser} />
      <Button color='red' onClick={() => setShowNewpost(!showNewpost) }>Create new workout</Button>
      {showNewpost && <Newpost setShowNewpost={setShowNewpost} isWorkout={true} />}
      {props.workouts !== [] ? props.workouts.map(workout => <Workout key={workout._id} workout={workout} /> ) : null}
    </div> 
  )
}

const mapStateToProps = (state) => {
  return {
    workouts: state.workouts,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { initAllWorkouts })(Workouts)