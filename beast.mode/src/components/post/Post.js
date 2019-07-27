import React from 'react'
import { Button, Input, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { addComment, like } from '../../reducers/feedReducer'
import useField from '../../hooks/useField'
import Comments from './Comments'

const elementStyle = {
  minWidth: '95%',
  maxHeight: '30%',
  align: 'top',
  maxWidth: '95%',
  marginLeft: '5px',
  marginTop: '25px',
  border: '1px solid #dddddd',
  whiteSpace: 'pre-line',
  textAlign: 'top',
  borderRadius: '3px',
  backgroundColor: '#ffffff'
}

const divStyle = {
  marginTop: '10px',
  marginLeft: '10px',
  marginBottom: '10px'
}

const divStyle2 = {
  marginTop: '10px',
  marginLeft: '10px',
  marginRight: '10px',
  marginBottom: '10px'
}

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

  const lineBreaks = (props.post.content.match(/\n/g) || []).length
  console.log(lineBreaks)
  return ( <div style={elementStyle}>
    <table>
      <tbody>
        <tr>
          <td>
            <div style={divStyle}>
              {props.post.user.picture && props.post.user.picture !== '' ?
                <Image width='32px' height='32px' circular src={props.post.user.picture} />
                : <Icon name='user' /> }
            </div>
          </td>
          <td>
            <div style={divStyle}>
              <strong><Link to={`/profile/${props.post.user.id}`}>{props.post.user.username}</Link></strong>
            </div>
          </td>
          {props.post.type === 'doneworkout' ? <td><div style={divStyle}><p>{` did a workout`}</p></div></td> : null}
        </tr>
      </tbody>
    </table>
    <div style={divStyle2}>
      {(props.post.picture && props.post.picture !== '') || lineBreaks > 10 
        ? <p>{props.post.content}</p> : <h3>{props.post.content}</h3>}
    </div>
    {props.post.picture && props.post.picture !== '' ? <Image size='big' src={props.post.picture} /> : null }
    <Comments comments={props.post.comments} showAll={false} postid={props.post._id} />
    <table><tbody>
      <tr>
        <td>        
          <Button size='small' color='green' icon onClick={() => props.like(props.post.type, props.post._id)}>
            <Icon name='like' />
          </Button>
        </td>
        <td width='100%'>
          <form onSubmit={sendComment}>
            <Input fluid size='small' icon={{ name: 'comment' }} {...comment} placeholder='Comment' />
          </form>
        </td>
      </tr>
    </tbody></table>
  </div> )
}

export default connect(null, { addComment, like })(withRouter(Post))