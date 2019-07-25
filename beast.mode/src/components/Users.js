import React, { useEffect } from 'react'
import Masonry from 'react-masonry-css'
import { connect } from 'react-redux'
import { initUsers } from '../reducers/usersReducer'
import User from './User'
import './Users.css'

const Users = (props) => {
  const listStyle = {
    display: 'flex',
    flexWrap: 'wrap'
  }

  const breakPoints = {
    default: 5,
    1400: 4,
    950: 3,
    500: 2
  }

  useEffect(() => {
    props.initUsers()
  }, [])

  if(props.users.length === 0) {
    return ( <div></div> )
  }

  return ( <div style={listStyle}>
    <Masonry className='masonry-grid' columnClassName='masonry-grid-column' breakpointCols={breakPoints}>
      {props.users.map(user => <User key={user.id} user={user} />)}
    </Masonry>
  </div> )
}

const mapStateToProps = (state) => {
  return { 
    currentUser: state.currentUser, 
    users: state.users
  }
}

export default connect(mapStateToProps, { initUsers })(Users)