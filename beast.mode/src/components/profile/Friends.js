import React from 'react'
import { connect } from 'react-redux'
import Friend from './Friend'
import './Dashboard.css'

const Friends = (props) => {
  if (props.currentProfile.friends.length === 0) {
    return ( <div>
    </div> )
  }

  return ( <div>
    <h2>{props.currentProfile.username}'s friends</h2>
    <div className='container'>
      {props.currentProfile.friends.map(friend => 
        <Friend key={friend.id} friend={friend} />)}
    </div>
  </div> )
}

const mapStateToProps = (state) => {
  return {
    currentProfile: state.currentProfile
  }
}
export default connect(mapStateToProps)(Friends)