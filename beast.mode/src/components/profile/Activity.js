import React from 'react'  
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Activity = (props) => {
  const activity = [ ...props.currentProfile.activity ].reverse()

  if(!props.currentProfile.activity && props.currentProfile.activity.length === 0) {
    return ( <div>
    </div> )
  }

  return ( <div>
    <h2>{props.currentProfile.username}'s activity</h2>
    {activity.map((activity, i) => 
      <p key={i}><Link to={activity.uri}>{activity.text}</Link></p>)}
  </div> )
}


const mapStateToProps = (state) => {
  return {
    currentProfile: state.currentProfile
  }
}
export default connect(mapStateToProps)(Activity)