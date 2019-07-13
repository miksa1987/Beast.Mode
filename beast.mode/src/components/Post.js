import React from 'react'
import { Button, Input, Card, Image, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { addComment, like } from '../reducers/feedReducer'
import useField from '../hooks/useField'

import Comment from './Comment'

const elementStyle = {
  minWidth: '95%',
  maxHeight: '30%',
  align: 'top',
  maxWidth: '95%',
  paddingTop: '15px',
  paddingLeft: '15px',
  flexGrow: '1',
  flexShrink: '1',
  flexBasis: '95%',
  whiteSpace: 'pre-line',
  textAlign: 'top'
}

const tableStyle = {
  tableLayout: 'fixed',
  wordWrap: 'break-word'
}

const picStyle = {
  verticalAlign: 'top',
  margin: '8px',
  width: '30%'
}

const contentStyle = {
  verticalAlign: 'text-top',
  margin: '8px',
  width: '40%'
}


const commentsStyle = {
  display: 'flex',
  align: 'right',
  margin: '8px',
  width: '100%',
  maxHeight: '150px',
  overflowY: 'auto'
}

const commentStyle = {
  verticalAlign: 'top',
  overflowY: 'auto',
  width: '100%'
}
// NOTE TO SELF: Think better style names.

const Post = (props) => {
  const [comment, resetComment] = useField('text')
  if(props.post === undefined) {
    return null
  }
  
  const sendComment = (event) => {
    event.preventDefault()
    props.addComment(props.post.type, props.post._id, comment.value)
    resetComment()
  }

  return ( <div style={elementStyle}>
    <Card fluid>
      <Card.Content>
        <Image floated='right' width='32px' height='32px'
          src={props.post.user.picture && props.post.user.picture !== '' 
          ? props.post.user.picture : '/img/ui/dashboard.png'} />
        <Card.Header>
          <Link to={`/profile/${props.post.user.id}`}>{props.post.user.username}</Link>
        </Card.Header>
        <Card.Description>
          <table style={tableStyle}><tbody><tr>
          <td style={picStyle}> 
            <Image size='medium' src={props.post.picture && props.post.picture !== '' 
              ? props.post.picture : 'https://react.semantic-ui.com/images/wireframe/image.png'} />
            <p>{props.post.likes.length} likes</p>
          </td> 
          <td style={contentStyle}><p>{props.post.content}</p></td>
          <td style={commentsStyle}>
            <div style={commentStyle}>
              {props.post.comments.map((c, i) => <Comment key={c._id} comment={c.content} user={c.user} />)} 
            </div>
          </td></tr></tbody></table>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <table><tbody>
          <tr>
            {props.post.type === 'workout' ? 
              <td width='23%'><Button color='red' onClick={() => props.history.push(`/doworkout/${props.post._id}`)}>
                Do this workout</Button></td>
              : null}
            <td>        
              <Button onClick={() => props.like(props.post.type, props.post._id)}>Like</Button>
            </td>
            <td width='100%'>
              <form onSubmit={sendComment}><Input fluid size='small' action='Comment' {...comment} /></form>
            </td>
          </tr>
          </tbody></table>          
      </Card.Content>
    </Card>
  </div> )
}

export default connect(null, { addComment, like })(withRouter(Post))