import React, { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import Newpost from './post/Newpost'
import Post from './post/Post'
import useOrientation from '../hooks/useOrientation'
import { connect } from 'react-redux'
import { initFeed, addToFeed, removeFromFeed } from '../reducers/feedReducer'
import './Feed.css'

const Feed = (props) => {
  const orientation = useOrientation()

  const breakPoints = {
    default: 4,
    1400: 3,
    950: 2,
    500: 1
  }

  useEffect(() => {
    if (props.feed.length === 0) {
      props.initFeed(props.currentUser.friends, props.currentUser.id)
    }
  }, [])

  if (props.feed === undefined) {
    return ( <div><Newpost /></div> )
  }

  return ( <div>
    <Newpost />
    <Masonry className='masonry-grid' columnClassName='masonry-grid-column' breakpointCols={breakPoints}>
      {props.feed.map(post => 
        <Post key={post._id} post={post} />)}
    </Masonry>
    
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