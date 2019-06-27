import React from 'react'
import { Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const Post = (props) => {
  return ( <div><Segment>
    <table><tbody><tr>
      <td><img width='32px' height='32px' src={props.post.user.picture} alt='pic' /></td>
      <td><Link to={`/profile/${props.post.user.username}`}><strong>{props.post.user.username}</strong></Link></td>
    </tr></tbody></table>
    <table><tbody><tr>
      <td><img src={props.post.picture} alt='pic' /></td>
      <td><p>{props.post.content}</p></td>
    </tr></tbody></table>
    <button>Like</button>
    <button>Comments</button>
  </Segment></div> )
}

export default Post