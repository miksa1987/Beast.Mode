import React from 'react'
import { connect } from 'react-redux'
import useOrientation from '../hooks/useOrientation'

const Notification = (props) => {
  const orientation = useOrientation()

  const notificationStyle = {
    backgroundColor: '#444444',
    position: 'fixed',
    top: '55px',
    left: '0px',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '2em',
    color: 'white',
    width: '100%',
    height: '2em'
  }
  
  const mobileStyle = {
    backgroundColor: '#444444',
    position: 'fixed',
    bottom: '10%',
    left: '50%',
    marginLeft: '-40%',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '2em',
    color: 'white',
    width: '80%',
    height: '2em'
  }

  if (props.notification === '') {
    return ( <div style={{ display: 'null' }}></div>)
  }

  return ( <div style={orientation === 'portrait' ? mobileStyle : notificationStyle}>
    <p>{props.notification}</p>
  </div> )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)