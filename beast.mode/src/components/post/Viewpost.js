import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initCurrentPost, commentCurrentPost, likeCurrentPost } from '../../reducers/currentPost'
import Post from './Post'

const Viewpost = (props) => {
  useEffect(() => {
    props.initCurrentPost(props.type, props.id)
  }, [])

  if (!props.post || !props.post.content) {
    return ( <div></div> )
  }

  return ( 
  <div>
    <Post post={props.post} sendComment={props.sendComment} sendLike={props.likeCurrentPost} />
  </div> 
  )
}

const mapStateToProps = (state) => {
  return {
    post: state.currentPost
  }
}

export default connect(mapStateToProps, { initCurrentPost, commentCurrentPost, likeCurrentPost })(Viewpost)