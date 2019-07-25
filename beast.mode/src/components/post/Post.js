import React, { useEffect } from 'react'
import { Button, Input, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { addComment, like } from '../../reducers/feedReducer'
import useField from '../../hooks/useField'
import useOrientation from '../../hooks/useOrientation'
import Comment from './Comment'

const elementStyle = {
  minWidth: '95%',
  maxHeight: '30%',
  align: 'top',
  maxWidth: '95%',
  marginLeft: '5px',
  marginTop: '25px',
  border: '1px solid #dddddd',
  whiteSpace: 'pre-line',
  textAlign: 'top'
}

const Post = (props) => {
  const [comment, resetComment] = useField('text')
  const orientation = useOrientation()

  if(props.post === undefined) {
    return null
  }
  
  const sendComment = (event) => {
    event.preventDefault()
    props.addComment(props.post.type, props.post._id, comment.value)
    resetComment()
  }

  const lineBreaks = (props.post.content.match(/\n/g) || []).length
  console.log(lineBreaks)
  return ( <div style={elementStyle}>
    <table>
      <tbody>
        <tr>
          <td>
            {props.post.user.picture && props.post.user.picture !== '' ?
              <Image width='32px' height='32px' circular src={props.post.user.picture} />
              : <Icon name='user' /> }
          </td>
          <td>
            <strong><Link to={`/profile/${props.post.user.id}`}>{props.post.user.username}</Link></strong>
          </td>
          {props.post.type === 'doneworkout' ? <td><p>{` did a workout`}</p></td> : null}
        </tr>
      </tbody>
    </table>
    {props.post.picture && props.post.picture !== '' ? <Image size='big' src={props.post.picture} /> : null }
    {(props.post.picture && props.post.picture !== '') || lineBreaks > 10 
      ? <p>{props.post.content}</p> : <h3>{props.post.content}</h3>}
    <table><tbody>
      <tr>
        <td>        
          <Button size='small' color='green' icon onClick={() => props.like(props.post.type, props.post._id)}>
            <Icon name='like' />
          </Button>
        </td>
        <td width='100%'>
          <form onSubmit={sendComment}><Input fluid size='small' icon={{ name: 'comment' }} {...comment} /></form>
        </td>
      </tr>
    </tbody></table>
  </div> )
}

export default connect(null, { addComment, like })(withRouter(Post))