import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { initAllWorkouts } from '../../reducers/workoutsReducer'
import useOrientation from './../../hooks/useOrientation'
import Workout from './Workout'
import Sidebar from './Sidebar'
import MobileSelection from './MobileSelection'
import Newpost from '../post/Newpost'
import './Workouts.css'
import { Button } from 'semantic-ui-react'
import Spinner from '../Spinner'

const Workouts = (props) => {
  const orientation = useOrientation()
  const [showNewpost, setShowNewpost] = useState(false)

  useEffect(() => {
    props.initAllWorkouts() // Add some kind of checking to avoid loading already loaded workouts
  }, [])

  if (props.workouts.length === 0) {
    return ( <div><Spinner /></div> )
  }
  
  return ( <div className={orientation === 'portrait' ? null : 'workouts-component'}>
    {orientation === 'portrait' && <MobileSelection currentUser={props.currentUser} /> }
    <Button color='blue' onClick={() => setShowNewpost(true) }>Create new workout</Button>
    {(orientation === 'portrait' && showNewpost) && <Newpost setShowNewpost={setShowNewpost} />}
    {(orientation !== 'portrait' && showNewpost) && <Newpost setShowNewpost={setShowNewpost} isWorkout={true} />}
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