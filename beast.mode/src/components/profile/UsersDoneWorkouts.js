import React, { useEffect } from 'react'
import Masonry from 'react-masonry-css'
import { connect } from 'react-redux'
import { initDoneWorkouts } from '../../reducers/doneWorkoutsReducer'
import Post from '../post/Post'
import '../Feed.css'

const UsersDoneWorkouts = (props) => {
  const breakPoints = {
    default: 4,
    1400: 3,
    950: 2,
    500: 1
  }

  useEffect(() => {
    props.initDoneWorkouts(props.currentProfile.id)
  }, [])

  if (!props.doneWorkouts.length === 0) {
    return ( <div></div> )
  }

  return ( <div>
    <Masonry className='masonry-grid' columnClassName='masonry-grid-column' breakpointCols={breakPoints}>
      {[ ...props.doneWorkouts ].reverse().map(doneWorkout => <Post key={doneWorkout._id} post={doneWorkout} />)}
    </Masonry>
  </div> )
}

const mapStateToProps = (state) => {
  return {
    doneWorkouts: state.doneWorkouts,
    currentProfile: state.currentProfile
  }
}

export default connect(mapStateToProps, { initDoneWorkouts })(UsersDoneWorkouts)