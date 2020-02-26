import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'
import { initUserPosts } from '../../reducers/currentUserPosts'
import { initCurrentProfile } from '../../reducers/currentProfile'
import { addFriend, removeFriend } from '../../reducers/currentUser'
import UserInfo from './UserInfo'
import Activity from './Activity'
import Friends from './Friends'
import Posts from './Posts'
import UsersDoneWorkouts from './UsersDoneWorkouts'
import UsersWorkouts from './UsersWorkouts'
import Spinner from '../Spinner'

import FlexDivRow from '../universal/FlexDivRow'
import PostsButton from '../universal/buttons/PostsButton'
import WorkoutsButton from '../universal/buttons/WorkoutButton'
import DoneworkoutsButton from '../universal/buttons/DoneworkoutsButton'
import FriendsButton from '../universal/buttons/PeopleButton'
import ActivityButton from '../universal/buttons/ActivityButton'

import '../Feed.css'
import './Dashboard.css'
import '../Animation.css'

const Dashboard  = (props) => {
  const isFriend = props.currentUser.friends.indexOf(props.currentProfile.id) > -1 ? true : false
  const isOwnProfile = props.currentUser.id === props.currentProfile.id ? true : false
  
  useEffect(() => {
    props.initCurrentProfile(props.user)
  }, [])

  if (!props.currentProfile.id) {
    return ( <div><Spinner /></div> )
  }

  return ( <div>
    <UserInfo 
      id={props.currentProfile.id} 
      username={props.currentProfile.username} 
      info={props.currentProfile.info} 
      picture={props.currentProfile.picture}
      isOwnProfile={isOwnProfile}
      isFriend={isFriend}
      removeFriend={props.removeFriend}
      addFriend={props.addFriend}
      pushToHistory={props.history.push}
    />

    <FlexDivRow>
      <PostsButton onClick={() => props.history.push(`/profile/${props.currentProfile.id}/posts`)} active={props.view === 'posts'} />
      <WorkoutsButton onClick={() => props.history.push(`/profile/${props.currentProfile.id}/workouts`)} active={props.view === 'workouts'} />
      <DoneworkoutsButton onClick={() => props.history.push(`/profile/${props.currentProfile.id}/doneworkouts`)} active={props.view === 'doneworkouts'} />
      <FriendsButton onClick={() => props.history.push(`/profile/${props.currentProfile.id}/friends`)} active={props.view === 'friends'} />
      <ActivityButton onClick={() => props.history.push(`/profile/${props.currentProfile.id}/activity`)} active={props.view === 'activity'} />
    </FlexDivRow>

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