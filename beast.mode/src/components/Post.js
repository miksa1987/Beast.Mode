import React from 'react'
import { Segment } from 'semantic-ui-react'

const Post = (props) => {
  return ( <div><Segment>
    <strong>{props.post.user}</strong>
    <p>{props.post.content}</p>
  </Segment></div> )
}

export default Post