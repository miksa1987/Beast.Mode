import React, { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import Newpost from './post/Newpost'
import Post from './post/Post'
import useOrientation from '../hooks/useOrientation'
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import { initFeed, addToFeed, removeFromFeed } from '../reducers/feedReducer'
import './Feed.css'

const Feed = (props) => {
  const [showNewpost, setShowNewpost] = useState(false)
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
    <div className='newpost-button'>
      <Button.Group>
        <Button color='green'
          onClick={() => setShowNewpost(!showNewpost)}>
            <Icon name='plus' />
            New post
        </Button>
        <Button color='blue'
          onClick={() => setShowNewpost(!showNewpost)}>
            <Icon name='plus' />
            New workout
        </Button>
      </Button.Group>
    </div>
    <div className='placeholder' />
    {orientation === 'portrait' && <Newpost />}
    <Masonry className='masonry-grid' columnClassName='masonry-grid-column' breakpointCols={breakPoints}>
      {props.feed.map(post => 
        <Post key={post._id} post={post} />)}
    </Masonry>
    {showNewpost && <Newpost setShowNewpost={setShowNewpost} />}
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