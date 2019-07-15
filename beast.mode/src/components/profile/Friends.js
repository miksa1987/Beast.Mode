import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Friends = (props) => {
  if (props.currentProfile.friends.length === 0) {
    return ( <div>
      <Link to={`/profile/${props.currentProfile.id}`}>Back to profile</Link>
    </div> )
  }

  return ( <div>
    <Link to={`/profile/${props.currentProfile.id}`}>Back to profile</Link>
    <h2>{props.currentProfile.username}'s friends</h2>
    {props.currentProfile.friends.map(friend => 
      <p key={friend.id}><Link to={`/profile/${friend.id}`}>{friend.username}</Link></p>)}
  </div> )
}

const mapStateToProps = (state) => {
  return {
    currentProfile: state.currentProfile
  }
}
export default connect(mapStateToProps)(Friends)