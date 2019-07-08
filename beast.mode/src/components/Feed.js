import React, { useEffect } from 'react'
import Newpost from './Newpost'
import FeedPost from './FeedPost'
import Post from './Post'
import { connect } from 'react-redux'
import { initFeed, addToFeed, removeFromFeed } from '../reducers/feedReducer'

const feedStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start'
}

const Feed = (props) => {
  useEffect(() => {
    props.initFeed(props.currentUser.friends, props.currentUser.id, props.feed.length)
  }, [])

  if(props.feed === undefined) {
    return ( <div><Newpost /></div> )
  }

  return ( <div style={feedStyle}>
    <Newpost />
    {props.feed.map(post => <FeedPost key={post._id} post={post} />)}
  </div> )
}

const mapStateToProps = (state) => {
  return { 
    feed: state.feed,
    currentUser: state.currentUser 
  }
}

const mapDispatchToProps = {
  initFeed, addToFeed, removeFromFeed
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)