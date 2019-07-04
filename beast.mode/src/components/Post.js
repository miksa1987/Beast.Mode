import React from 'react'
import { Button } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'


const elementStyle = {
  minWidth: '45%',
  maxWidth: '45%',
  paddingTop: '15px',
  paddingLeft: '15px',
  flexGrow: '1',
  flexShrink: '1',
  flexBasis: '50%',
  whiteSpace: 'pre-line'
}

const Post = (props) => {
  if(props.post === undefined) {
    return null
  }
  return ( <div style={elementStyle}>
    <table><tbody><tr>
      <td><img width='32px' height='32px' 
        src={props.post.user.picture && props.post.user.picture !== '' 
        ? props.post.user.picture : '/img/ui/dashboard.png'} alt='pic' /></td>
      <td><Link to={`/profile/${props.post.user.username}`}><strong>{props.post.user.username}</strong></Link></td>
      { props.post.type === 'workout' ? <td><strong>WORKOUT</strong></td> : null}
    </tr></tbody></table>
    <table><tbody><tr>
      {props.post.picture && props.post.picture !== '' 
        ? <td><img src={props.post.picture} alt='pic' /></td> : null} 
      <td><p>{props.post.content}</p></td>
    </tr></tbody></table>
    <Button>Like</Button>
    <Button>Comments</Button>
    {props.post.type === 'workout' ? 
      <Button color='red' onClick={() => props.history.push(`/doworkout/${props.post._id}`)}>Do this workout</Button>
      : null}
  </div> )
}

export default withRouter(Post)