import React from 'react'  
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Activity = (props) => {
  if(props.currentProfile.activity.lenth === 0) {
    return ( <div>
      <Link to={`/profile/${props.currentProfile.id}`}>Back to profile</Link>
    </div> )
  }

  return ( <div>
    <Link to={`/profile/${props.currentProfile.id}`}>Back to profile</Link>
    <h2>{props.currentProfile.username}'s activity</h2>
    {props.currentProfile.activity.map((activity, i) => 
      <p key={i}><Link to={activity.uri}>{activity.text}</Link></p>)}
  </div> )
}


const mapStateToProps = (state) => {
  return {
    currentProfile: state.currentProfile
  }
}
export default connect(mapStateToProps)(Activity)