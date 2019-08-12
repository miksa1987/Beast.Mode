import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { initAllWorkouts } from '../../reducers/workoutsReducer'
import useWindowSize from './../../hooks/useWindowSize'
import Workout from './Workout'
import Sidebar from './Sidebar'
import MobileSelection from './MobileSelection'
import Newpost from '../post/Newpost'
import './Workouts.css'
import { Button } from 'semantic-ui-react'
import Spinner from '../Spinner'

// export for testing
export const Workouts = (props) => {
  const screen = useWindowSize()
  const [showNewpost, setShowNewpost] = useState(false)

  useEffect(() => {
    props.initAllWorkouts() // Add some kind of checking to avoid loading already loaded workouts
  }, [])

  if (props.workouts.length === 0) {
    return ( <div><Spinner /></div> )
  }
  
  return ( <div className={screen.width < screen.height ? null : 'workouts-component'}>
    {screen.width < screen.height && <MobileSelection currentUser={props.currentUser} /> }
    <Button color='blue' onClick={() => setShowNewpost(true) }>Create new workout</Button>
    {(screen.width < screen.height && showNewpost) && <Newpost setShowNewpost={setShowNewpost} isWorkout={true} />}
    {(screen.width > screen.height && showNewpost) && <Newpost setShowNewpost={setShowNewpost} isWorkout={true} />}
    {props.workouts !== [] ? props.workouts.map(workout => <Workout key={workout._id} workout={workout} /> ) : null}
    {screen.width > screen.height && <Sidebar currentUser={props.currentUser} />}
  </div> )
}

const mapStateToProps = (state) => {
  return {
    workouts: state.workouts,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { initAllWorkouts })(Workouts)