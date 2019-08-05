import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Image, Menu, Icon, Button } from 'semantic-ui-react'
import { initUserPosts } from '../../reducers/currentUserPosts'
import { initCurrentProfile } from '../../reducers/currentProfile'
import { addFriend, removeFriend } from '../../reducers/currentUser'
import useOrientation from '../../hooks/useOrientation'
import Masonry from 'react-masonry-css'
import Activity from './Activity'
import Friends from './Friends'
import Photos from './Photos'
import UsersDoneWorkouts from './UsersDoneWorkouts'
import UsersWorkouts from './UsersWorkouts'
import Spinner from '../Spinner'
import '../Feed.css'
import './Dashboard.css'
import '../Animation.css'

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
      console.log(props.currentUser)
      if ((props.currentProfile.id && props.currentProfile.id !== props.user) || props.currentUserPosts.length === 0) {
        props.initUserPosts(props.user)
      }
  }, [])

  if (!props.currentProfile.id && props.currentUserPosts.length === 0) {
    return ( <div><Spinner /></div> )
  }

  return ( <div className='fade-in-fast'>
    <div className='element'>
      <table>
        <tbody>
          <tr>
            <td>
              <Image height='150px' width='150px' circular src={props.currentProfile.picture && props.currentProfile.picture !== '' ? 
                props.currentProfile.picture : 'https://react.semantic-ui.com/images/wireframe/image.png'} 
                className='fade-in-fast' />
            </td>
            <td className='info'>
              <h2>{props.currentProfile.username}</h2>
              <p>{props.currentProfile.info}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    {props.currentUser.friends.indexOf(props.currentProfile.id) > -1 
    ? <Button className='add-button' color='red' onClick={() => props.removeFriend(props.currentProfile.id)} >
        Remove friend</Button>
    : <Button className='add-button' color='green' onClick={() => props.addFriend(props.currentProfile.id)} >
        Add friend</Button> }

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
      <Menu.Item onClick={() => setView('friends')} active={view === 'friends'}>
        <Icon name='users' />
        Friends
      </Menu.Item>
      <Menu.Item onClick={() => setView('activity')} active={view === 'activity'}>
        <Icon name='bars' />
        Activity
      </Menu.Item>
    </Menu>

    { /* view === 'photos' && <Photos /> Disabled for now as I see no real use for this */ }
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
    currentProfile: state.currentProfile,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { initUserPosts, initCurrentProfile, addFriend, removeFriend })(withRouter(Dashboard))