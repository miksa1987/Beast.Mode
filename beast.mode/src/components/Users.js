import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initUsers } from '../reducers/usersReducer'
import User from './User'

const Users = (props) => {
  const listStyle = {
    display: 'flex',
    flexWrap: 'wrap'
  }

  console.log(props.users)

  useEffect(() => {
    props.initUsers()
  }, [])

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