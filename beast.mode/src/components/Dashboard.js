import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initUserPosts } from '../reducers/currentUserPosts'
import Post from './Post'

const Dashboard  = (props) => {
  const userTitleStyle = {
    verticalAlign: 'top'
  }

  useEffect(() => {
    console.log('Init user posts')
    props.initUserPosts(props.currentUser.id)
  }, [])

  const divStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  }

  return ( <div>
    <table><tbody><tr>
      <td><img src={props.user.picture} alt='user' /></td>
      <td style={userTitleStyle}><strong style={userTitleStyle}>{props.user.username}</strong></td>
    </tr></tbody></table>
    <div style={divStyle}>
      <table><tbody>
      <tr><td><strong>{props.currentUser.username}'s photos</strong></td></tr>
      <tr>
      <td><img src={props.user.picture} alt='user' /></td>
      <td><img src={props.user.picture} alt='user' /></td>
      <td><img src={props.user.picture} alt='user' /></td>
        </tr>
        <tr>
        <td><img src={props.user.picture} alt='user' /></td>
        <td><img src={props.user.picture} alt='user' /></td>
        <td><img src={props.user.picture} alt='user' /></td>
        </tr>
      </tbody></table>
      {props.currentUserPosts.map(post => <Post key={post._id} post={post} /> )}
    </div>
  </div> )
}

const mapStateToProps = (state) => {
  return { 
    currentUserPosts: state.currentUserPosts,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { initUserPosts })(Dashboard)