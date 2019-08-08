import React, { useEffect } from 'react'
import Masonry from 'react-masonry-css'
import { connect } from 'react-redux'
import { breakPoints } from '../masonry-config'
import { initUserPosts } from '../../reducers/currentUserPosts'
import Post from '../post/Post'
import '../Feed.css'
import './Dashboard.css'
import '../Animation.css'

const Posts = (props) => {
  useEffect(() => {
    props.initUserPosts(props.currentProfile.id)
  }, [])

  if (!props.currentUserPosts.length === 0) {
    return ( <div></div> )
  }

  return ( <div>
    <Masonry className='masonry-grid' columnClassName='masonry-grid-column' breakpointCols={breakPoints}>
      {[ ...props.currentUserPosts ].reverse().map(doneWorkout => <Post key={doneWorkout._id} post={doneWorkout} />)}
    </Masonry>
  </div> )
}

const mapStateToProps = (state) => {
  return {
    currentUserPosts: state.currentUserPosts,
    currentProfile: state.currentProfile
  }
}

export default connect(mapStateToProps, { initUserPosts })(Posts)