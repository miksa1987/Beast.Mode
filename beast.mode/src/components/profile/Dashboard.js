import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Image, Menu, Icon, Button } from 'semantic-ui-react'
import { initUserPosts } from '../../reducers/currentUserPosts'
import { initCurrentProfile } from '../../reducers/currentProfile'
import { addFriend, removeFriend } from '../../reducers/currentUser'
import Activity from './Activity'
import Friends from './Friends'
import Posts from './Posts'
import UsersDoneWorkouts from './UsersDoneWorkouts'
import UsersWorkouts from './UsersWorkouts'
import Spinner from '../Spinner'
import '../Feed.css'
import './Dashboard.css'
import '../Animation.css'

const Dashboard  = (props) => {
  useEffect(() => {
    props.initCurrentProfile(props.user)
  }, [])

  if (!props.currentProfile.id) {
    return ( <div><Spinner /></div> )
  }

  return ( <div>
    <div className='element'>
      <table>
        <tbody>
          <tr>
            <td>
              <Image height='150px' width='150px' circular src={props.currentProfile.picture && props.currentProfile.picture !== '' ? 
                props.currentProfile.picture : 'https://react.semantic-ui.com/images/wireframe/image.png'} 
              className='profileview-image' />
            </td>
            <td className='info'>
              <h2>{props.currentProfile.username}</h2>
              <p>{props.currentProfile.info}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    {props.currentUser.id !== props.currentProfile.id ? props.currentUser.friends.indexOf(props.currentProfile.id) > -1 
      ? <Button id='removefriend-button' className='add-button' color='red' onClick={() => props.removeFriend(props.currentProfile.id)} >
        Remove friend</Button>
      : <Button id='addfriend-button' className='add-button' color='green' onClick={() => props.addFriend(props.currentProfile.id)} >
        Add friend</Button> : null}
    
    {props.currentUser.id === props.currentProfile.id
      && <Button icon id='settings-button' className='settings-button' onClick={() => props.history.push('/settings')}>
        <Icon name='settings' />
      </Button>}

    <Menu pointing secondary stackable>
      <Menu.Item id='dash-menu-posts' 
        onClick={() => props.history.push(`/profile/${props.currentProfile.id}/posts`)} active={props.view === 'posts'}>
        <Icon name='sticky note' />
          Posts 
      </Menu.Item>
      <Menu.Item id='dash-menu-workouts' 
        onClick={() => props.history.push(`/profile/${props.currentProfile.id}/workouts`)} active={props.view === 'workouts'}>
        <Icon name='hand rock' />
          Workouts
      </Menu.Item>
      <Menu.Item id='dash-menu-doneworkouts' 
        onClick={() => props.history.push(`/profile/${props.currentProfile.id}/doneworkouts`)} active={props.view === 'doneworkouts'}>
        <Icon name='trophy' />
          Done workouts
      </Menu.Item>
      <Menu.Item id='dash-menu-friends' 
        onClick={() => props.history.push(`/profile/${props.currentProfile.id}/friends`)} active={props.view === 'friends'}>
        <Icon name='users' />
          Friends
      </Menu.Item>
      <Menu.Item id='dash-menu-activity' 
        onClick={() => props.history.push(`/profile/${props.currentProfile.id}/activity`)} active={props.view === 'activity'}>
        <Icon name='bars' />
          Activity
      </Menu.Item>
    </Menu>

    { /* props.view === 'photos' && <Photos /> Disabled for now as I see no real use for this */ }
    {props.view === 'posts' && <Posts />}
    {props.view === 'workouts' && <UsersWorkouts />}
    {props.view === 'doneworkouts' && <UsersDoneWorkouts />}
    {props.view === 'friends' && <Friends />}
    {props.view === 'activity' && <Activity />}
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