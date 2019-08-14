import React from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import { initFriendWorkouts, initNewestWorkouts, initRandomWorkouts, initMostLikedWorkouts } from '../../reducers/workoutsReducer'
import Searchbar from './Searchbar'

const MobileSelection = (props) => {
  return ( <div>
    <Dropdown className='mobile-topitems' fluid button text='Filters'>
      <Dropdown.Menu>
        <Dropdown.Item text='Featured workouts' onClick={props.initRandomWorkouts} />
        <Dropdown.Item text='Newest workouts' onClick={props.initNewestWorkouts} />
        <Dropdown.Item text='Most liked workouts' onClick={props.initMostLikedWorkouts} />
        <Dropdown.Item text={`Friends' workouts`} onClick={() => props.initFriendWorkouts(props.currentUser.id)} />
      </Dropdown.Menu>
    </Dropdown>
    <Searchbar className='mobile-topitems' />
  </div> )
}

export default connect(null, { initFriendWorkouts, initNewestWorkouts, initRandomWorkouts, initMostLikedWorkouts })(MobileSelection)