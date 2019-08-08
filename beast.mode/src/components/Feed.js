import React, { useEffect } from 'react'
import Masonry from 'react-masonry-css'
import Newpost from './post/Newpost'
import Post from './post/Post'
import Spinner from './Spinner'
import useOrientation from '../hooks/useOrientation'
import { connect } from 'react-redux'
import { initFeed, addToFeed, removeFromFeed, loadMorePosts, setEndDate } from '../reducers/feedReducer'
import useScrollPercentage from '../hooks/useScrollPercentage'
import './Feed.css'

const Feed = (props) => {
  const orientation = useOrientation()
  const scrollPercentage = useScrollPercentage()
  const feedLength = props.feed.feed.length

  const breakPoints = {
    default: 4,
    1400: 3,
    950: 2,
    500: 1
  }

  useEffect(() => {
    if (props.feed.feed.length === 0 && !props.feed.end) {
      console.log('init')
      props.setEndDate()
      props.initFeed()
    }
  }, [])

  useEffect(() => {
    if (feedLength > 0 && feedLength < 20 && !props.feed.end) {
      props.loadMorePosts()
    }
  }, [feedLength])

  useEffect(() => {
    if (scrollPercentage > 60 && !props.feed.loading) {
      console.log('trigger more posts')
      props.loadMorePosts()
    }
  }, [scrollPercentage])

  if (props.feed.feed.length === 0 && props.feed.loading) {
    console.log('spinner')
    return ( <div><Newpost /><Spinner /></div> )
  }
  // This could maybe work ?
  const items = []
    .concat(<Newpost key='WEEEEEE' />)
    .concat(props.feed.feed.map(post =>
       <Post key={post._id} post={post} />))

  return ( <div>
    {orientation === 'portrait' && <Newpost />}
    { orientation !== 'portrait' && <Masonry className='masonry-grid' columnClassName='masonry-grid-column' breakpointCols={breakPoints}>
      {items}
    </Masonry> }
    { orientation === 'portrait' && props.feed.feed.map(post => 
      <Post key={post._id} post={post} />)}
    {props.feed.loading && <Spinner />}
  </div> )
}

const mapStateToProps = (state) => {
  return { 
    feed: state.feed,
    currentUser: state.currentUser 
  }
}

const mapDispatchToProps = {
  initFeed, addToFeed, removeFromFeed, loadMorePosts, setEndDate
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)