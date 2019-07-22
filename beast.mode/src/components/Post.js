import React from 'react'
import { Button, Input, Divider, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { addComment, like } from '../reducers/feedReducer'
import useField from '../hooks/useField'
import useOrientation from '../hooks/useOrientation'
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

const contentStyle = {
  verticalAlign: 'text-top',
  margin: '8px',
  width: '100%',
  height: '100%'  
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
  const orientation = useOrientation()

  if(props.post === undefined) {
    return null
  }
  
  const sendComment = (event) => {
    event.preventDefault()
    props.addComment(props.post.type, props.post._id, comment.value)
    resetComment()
  }

  if (orientation === 'portrait') {
    return ( <div style={elementStyle}>
      <table>
        <tbody>
          <tr>
            <td>
              <Image circular width='32px' height='32px'
                src={props.post.user.picture && props.post.user.picture !== '' 
                ? props.post.user.picture : '/img/ui/dashboard.png'} />
            </td>
            <td>
              <strong><Link to={`/profile/${props.post.user.id}`}>{props.post.user.username}</Link></strong>
                {props.post.type === 'doneworkout' ? ' did a workout' : ''}
            </td>
          </tr>
        </tbody>
      </table>
      {props.post.picture && props.post.picture !== '' ? <Image size='big' src={props.post.picture} /> : null }
      <p>{props.post.content}</p>
      <table><tbody>
        <tr>
          <td>        
            <Button onClick={() => props.like(props.post.type, props.post._id)}>Like</Button>
          </td>
          <td width='100%'>
            <form onSubmit={sendComment}><Input fluid size='mini' action='Comment' {...comment} /></form>
          </td>
        </tr>
      </tbody></table>
      <Divider />
    </div> )
  }

  return ( <div style={elementStyle}>
    <table>
      <tbody>
        <tr>
          <td>
            <Image circular width='32px' height='32px'
              src={props.post.user.picture && props.post.user.picture !== '' 
              ? props.post.user.picture : '/img/ui/dashboard.png'} />
          </td>
          <td>
            <strong><Link to={`/profile/${props.post.user.id}`}>{props.post.user.username}</Link></strong>
              {props.post.type === 'doneworkout' ? ' did a workout' : ''}
          </td>
        </tr>
      </tbody>
    </table>
    <table>
      <tbody>
        <tr>
          <td style={{width: '60%'}}>
            <Image size='big' src={props.post.picture && props.post.picture !== '' 
              ? props.post.picture : 'https://react.semantic-ui.com/images/wireframe/image.png'} />
          </td>
          <td style={contentStyle}>
            <table>
              <tbody>
                <tr>          
                  <td style={contentStyle}><p>{props.post.content}</p></td>
                </tr>
                <tr>
                  <td style={commentsStyle}>
                    <div style={commentStyle}>
                      {props.post.comments.length === 0 ? null
                        : <strong>Comments:</strong>}
                      {props.post.comments.map((c, i) => <Comment key={c._id} comment={c.content} user={c.user} />)} 
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
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
          <form onSubmit={sendComment}><Input fluid size='mini' action='Comment' {...comment} /></form>
        </td>
      </tr>
    </tbody></table>
    <Divider />
  </div> )
}

export default connect(null, { addComment, like })(withRouter(Post))