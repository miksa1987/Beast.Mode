import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Image, Menu, Icon, Button } from 'semantic-ui-react'
import { initUserPosts } from '../../reducers/currentUserPosts'
import { initCurrentProfile } from '../../reducers/currentProfile'
import { addFriend } from '../../reducers/currentUser'
import useOrientation from '../../hooks/useOrientation'
import Masonry from 'react-masonry-css'
import Activity from './Activity'
import Friends from './Friends'
import Photos from './Photos'
import UsersDoneWorkouts from './UsersDoneWorkouts'
import UsersWorkouts from './UsersWorkouts'
import '../Feed.css'

import Post from '../post/Post'

const Dashboard  = (props) => {
  const [view, setView] = useState('posts')
  const orientation = useOrientation()

  const breakPoints = {
    default: 4,
    1400: 3,
    950: 2,
    500: 1
  }

  useEffect(() => {
      props.initCurrentProfile(props.user)
      
      if (props.currentProfile.id && props.currentProfile.id !== props.user || props.currentUserPosts.length === 0) {
        props.initUserPosts(props.user)
      }
  }, [])

  const infoStyle = {
    verticalAlign: 'top',
    width: '50%'
  }

  const addFriendButtonStyle = {
    position: 'absolute',
    right: '75px',
    top: '100px'
  }

  if (!props.currentProfile.id && !props.currentUserPosts.length === 0) {
    return ( <div>Loading...</div> )
  }

  return ( <div>
    <table>
      <tbody>
        <tr>
          <td>
            <Image height='150px' width='150px' circular src={props.currentProfile.picture && props.currentProfile.picture !== '' ? 
              props.currentProfile.picture : 'https://react.semantic-ui.com/images/wireframe/image.png'} />
          </td>
          <td style={infoStyle}>
            <h2>{props.currentProfile.username}</h2>
            <p>{props.currentProfile.info}</p>
          </td>
        </tr>
      </tbody>
    </table>
    {orientation === 'portrait' ? 
      <Button color='green'
        onClick={() => props.addFriend(props.currentProfile.id)}>
        <Icon name='plus' />
        Add as friend
      </Button>
      : <Button style={addFriendButtonStyle} color='green'
        onClick={() => props.addFriend(props.currentProfile.id)}>
        <Icon name='plus' />
        Add as friend
      </Button> }
    <Menu pointing secondary stackable>
      <Menu.Item onClick={() => setView('posts')} active={view === 'posts'}>
        <Icon name='sticky note' />
        Posts
      </Menu.Item>
      <Menu.Item onClick={() => setView('workouts')} active={view === 'workouts'}>
        <Icon name='hand rock' />
        Workouts
      </Menu.Item>
      <Menu.Item onClick={() => setView('doneworkouts')} active={view === 'doneworkouts'}>
        <Icon name='trophy' />
        Done workouts
      </Menu.Item>
      <Menu.Item onClick={() => setView('photos')} active={view === 'photos'}>
        <Icon name='images' />
        Photos
      </Menu.Item>
      <Menu.Item onClick={() => setView('friends')} active={view === 'friends'}>
        <Icon name='users' />
        Friends
      </Menu.Item>
      <Menu.Item onClick={() => setView('activity')} active={view === 'activity'}>
        <Icon name='bars' />
        Activity
      </Menu.Item>
    </Menu>
    {view === 'photos' && <Photos />}
    {view === 'posts' && 
      <Masonry className='masonry-grid' columnClassName='masonry-grid-column' breakpointCols={breakPoints}>
        {props.currentUserPosts.map(post => 
          <Post key={post._id} post={post} />)}
    </Masonry> }
    {view === 'workouts' && <UsersWorkouts />}
    {view === 'doneworkouts' && <UsersDoneWorkouts />}
    {view === 'friends' && <Friends />}
    {view === 'activity' && <Activity />}
  </div> )
}

const mapStateToProps = (state) => {
  return { 
    currentUserPosts: state.currentUserPosts,
    currentProfile: state.currentProfile
  }
}

export default connect(mapStateToProps, { initUserPosts, initCurrentProfile, addFriend })(withRouter(Dashboard))