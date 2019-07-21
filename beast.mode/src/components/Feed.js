import React, { useEffect } from 'react'
import { Divider } from 'semantic-ui-react'
import Newpost from './Newpost'
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
    if(props.feed.length === 0) {
      props.initFeed(props.currentUser.friends, props.currentUser.id)
    }
  }, [])

  if(props.feed === undefined) {
    return ( <div><Newpost /></div> )
  }

  return ( <div style={feedStyle}>
    <Newpost />
    <Divider />
    {props.feed.map(post => <Post key={post._id} post={post} />)}
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