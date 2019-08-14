import React, { useEffect } from 'react'
import Masonry from 'react-masonry-css'
import Newpost from './post/Newpost'
import Post from './post/Post'
import Spinner from './Spinner'
import useWindowSize from '../hooks/useWindowSize'
import { breakPoints } from './masonry-config'
import { connect } from 'react-redux'
import { initFeed, addToFeed, removeFromFeed, loadMorePosts, setEndDate } from '../reducers/feedReducer'
import useScrollPercentage from '../hooks/useScrollPercentage'
import './Feed.css'

const Feed = (props) => {
  const screen = useWindowSize()
  const scrollPercentage = useScrollPercentage()
  const feedLength = props.feed.feed.length

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
      props.loadMorePosts()
    }
  }, [scrollPercentage])

  if (props.feed.feed.length === 0 && props.feed.loading) {
    return ( <div><Newpost /><Spinner /></div> )
  }

  const items = []
    .concat(<Newpost key='WEEEEEE' />)
    .concat(props.feed.feed.map(post =>
       <Post key={post._id} post={post} />))

  return ( <div>
    {screen.width < screen.height && <Newpost />}
    {screen.width > screen.height  && <Masonry className='masonry-grid' columnClassName='masonry-grid-column' breakpointCols={breakPoints}>
      {items}
    </Masonry> }
    {screen.width < screen.height && props.feed.feed.map(post => 
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