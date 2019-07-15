import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { loginUser } from '../../reducers/currentUser'
import NewUser from './NewUser'
import Loginbar from './Loginbar'

const LoginForm = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const loginStyle = {
    marginBottom: '0px'
  }
  
  const bottomStyle = {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    width: '100%'
  }

  return ( <div style={loginStyle}>
    <NewUser />
    <Loginbar />
    <p style={bottomStyle}>About Beast.MODE</p>
  </div> )
}

export default connect(null, { loginUser })(LoginForm)