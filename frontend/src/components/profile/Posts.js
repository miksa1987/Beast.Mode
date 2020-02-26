import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initUserPosts } from '../../reducers/currentUserPosts'
import Post from '../post/Post'
import Spinner from '../Spinner'
import '../Feed.css'
import './Dashboard.css'
import '../Animation.css'

const Posts = (props) => {
  useEffect(() => {
    props.initUserPosts(props.currentProfile.id)
  }, [])

  if (props.currentProfile.posts.length !== 0 && props.currentUserPosts.length === 0) {
    return ( <div><Spinner /></div>)
  }
  if (props.currentUserPosts.length === 0) {
    return ( <div></div> )
  }

  return ( 
    <div>
      {props.currentUserPosts.map(doneWorkout => <Post key={doneWorkout._id} post={doneWorkout} />)}
    </div> 
  )
}

const mapStateToProps = (state) => {
  return {
    currentUserPosts: state.currentUserPosts,
    currentProfile: state.currentProfile
  }
}

export default connect(mapStateToProps, { initUserPosts })(Posts)