import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Card, Image, Button } from 'semantic-ui-react'
import { initUserPosts } from '../reducers/currentUserPosts'
import Post from './Post'

const Dashboard  = (props) => {
  const userTitleStyle = {
    verticalAlign: 'top'
  }

  useEffect(() => {
    console.log(props.user)
    props.initUserPosts(props.currentUser.id)
  }, [])

  const divStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  }

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
    width: '50%'
  }

  return ( <div>
    <Card fluid>
      <Card.Header>
        {props.user.username}
      </Card.Header>
      <Card.Description>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={picStyle}>
                <Image size='small' src={props.user.picture && props.user.picture !== '' ? 
                props.user.picture : 'https://react.semantic-ui.com/images/wireframe/image.png'} />
              </td>
              <td style={infoStyle}>
                HERE COMES INFO ABOUT THIS USER
              </td>
              <td style={picsStyle}>
                <table>
                  <tbody>
                  <tr>
                      <td>                
                        <Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />  
                      </td>
                      <td>
                        <Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                      </td>
                      <td>
                        <Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                      </td>
                    </tr>
                    <tr>
                      <td>                
                        <Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />  
                      </td>
                      <td>
                        <Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                      </td>
                      <td>
                        <Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                      </td>
                    </tr>
                    <tr>
                      <td>                
                        <Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />  
                      </td>
                      <td>
                        <Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
                      </td>
                      <td>
                        <Image size='small' src='https://react.semantic-ui.com/images/wireframe/image.png' />
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
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { initUserPosts })(Dashboard)