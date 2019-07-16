import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Card, Image, Button } from 'semantic-ui-react'
import { initUserPosts } from '../../reducers/currentUserPosts'
import { initCurrentProfile } from '../../reducers/currentProfile'

import Post from '../Post'

const Dashboard  = (props) => {
  useEffect(() => {
      props.initCurrentProfile(props.user)
      
      if (props.currentProfile.id && props.currentProfile.id !== props.user || props.currentUserPosts.length === 0) {
        props.initUserPosts(props.user)
      }
  }, [])

  const tableStyle = {
    tableLayout: 'fixed',
    wordWrap: 'break-word'
  }

  const picStyle = {
    width: '20%'
  }
  const picsStyle = {
    width: '30%'
  }
  const infoStyle = {
    verticalAlign: 'top',
    width: '50%'
  }

  if (!props.currentProfile.id && !props.currentUserPosts.length === 0) {
    return ( <div>Loading...</div> )
  }

  return ( <div>
    <Card fluid>
      <Card.Header>
        {props.currentProfile.username}
      </Card.Header>
      <Card.Description>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={picStyle}>
                <Image size='small' src={props.currentProfile.picture && props.currentProfile.picture !== '' ? 
                props.currentProfile.picture : 'https://react.semantic-ui.com/images/wireframe/image.png'} />
              </td>
              <td style={infoStyle}>
                <p>{props.currentProfile.info}</p>
              </td>
              <td style={picsStyle}>
                <table>
                  <tbody>
                    <tr>
                      <td>                
                        <Button onClick={() => props.history.push(`/profile/${props.currentProfile.id}/activity`)}>
                          {props.currentProfile.username}'s activity</Button>
                        <Button onClick={() => props.history.push(`/profile/${props.currentProfile.id}/friends`)}>
                          {props.currentProfile.username}'s friends</Button>
                        <Button onClick={() => props.history.push(`/profile/${props.currentProfile.id}/photos`)}>
                          {props.currentProfile.username}'s photos</Button>
                        <Button onClick={() => props.history.push(`/profile/${props.currentProfile.id}/workouts`)}>
                          {props.currentProfile.username}'s workouts</Button>  
                        <Button onClick={() => props.history.push(`/profile/${props.currentProfile.id}/doneworkouts`)}>
                        {props.currentProfile.username}'s done workouts</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </Card.Description>
    </Card>
      {props.currentUserPosts.map(post => <Post key={post._id} post={post} /> )}
  </div> )
}

const mapStateToProps = (state) => {
  return { 
    currentUserPosts: state.currentUserPosts,
    currentProfile: state.currentProfile
  }
}

export default connect(mapStateToProps, { initUserPosts, initCurrentProfile })(withRouter(Dashboard))