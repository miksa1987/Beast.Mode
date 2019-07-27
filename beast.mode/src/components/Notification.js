import React from 'react'
import { connect } from 'react-redux'
import './Notification.css'

const Notification = (props) => {
  if (props.notification === '') {
    return ( <div style={{ display: 'null' }}></div>)
  }

  return ( <div className='notification-style'>
    <p>{props.notification}</p>
  </div> )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)