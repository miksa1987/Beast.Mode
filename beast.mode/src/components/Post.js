import React from 'react'
import { Segment, Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom'


const elementStyle = {
  minWidth: '45%',
  maxWidth: '45%',
  paddingTop: '15px',
  paddingLeft: '15px',
  flexGrow: '1',
  flexShrink: '1',
  flexBasis: '50%'
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
    </tr></tbody></table>
    <table><tbody><tr>
      {props.post.picture && props.post.picture !== '' 
        ? <td><img src={props.post.picture} alt='pic' /></td> : null} 
      <td><p>{props.post.content}</p></td>
    </tr></tbody></table>
    <Button>Like</Button>
    <Button>Comments</Button>
  </div> )
}

export default Post