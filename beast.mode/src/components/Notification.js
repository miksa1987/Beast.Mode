import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Animation from './Animation'

const NotificationBase = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(45, 45, 45, 0.7);
  border: 1px solid #dddddd;
  border-radius: 7px;
  position: fixed;
  top: 85px;
  left: 50%;
  margin-left: -20%;
  word-wrap: break-word;
  color: white;
  width: 40%;
  height: 4em

  @media (max-width: 600px) {
    background-color: rgba(45, 45, 45, 0.7);
    position: fixed;
    bottom: 10%;
    left: 50%;
    margin-left: -40%;
    color: white;
    width: 80%;
    height: 3em;
    border-radius: 6px;
  }
  
`

const Notification = (props) => {
  if (props.notification === '') {
    return ( <div></div>)
  }

  return ( 
    <Animation>
      <NotificationBase>
        <p>{props.notification}</p>
      </NotificationBase>
    </Animation> 
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)