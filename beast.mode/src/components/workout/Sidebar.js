import React from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { initFriendWorkouts, initNewestWorkouts, initAllWorkouts, initMostLikedWorkouts } from '../../reducers/workoutsReducer'
import Searchbar from './Searchbar'
import './Sidebar.css'

const Sidebar = (props) => {
  return ( <div className="sidebar">
    <Menu vertical className='menu-style'>
      <Menu.Item>
        <Searchbar />
      </Menu.Item>
      <Menu.Item onClick={props.initAllWorkouts}>
        Featured
      </Menu.Item>
      <Menu.Item onClick={props.initNewestWorkouts}>
        Newest
      </Menu.Item>
      <Menu.Item onClick={() => props.initFriendWorkouts(props.currentUser.id)}>
        Friends' workouts
      </Menu.Item>
      <Menu.Item onClick={props.initMostLikedWorkouts}>
        Most liked
      </Menu.Item>
    </Menu>
  </div> )
}

export default connect(null, { initFriendWorkouts, initNewestWorkouts, initAllWorkouts, initMostLikedWorkouts })(Sidebar)