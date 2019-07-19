import React from 'react'
import { connect } from 'react-redux'
import { initUsers } from '../reducers/users'
import User from './User'

const Users = (props) => {
  const listStyle = {
    display: 'flex',
    flexWrap: 'wrap'
  }

  if(props.users.length === 0) {
    return ( <div></div> )
  }

  return ( <div style={listStyle}>
    {props.users.map(user => <User key={user.id} user={user} />)}
  </div> )
}

const mapStateToProps = (state) => {
  return { 
    currentUser: state.currentUser, 
    users: state.users
  }
}

export default connect(mapStateToProps, { initUsers })(Users)