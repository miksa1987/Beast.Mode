import React from 'react'
import { Input, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { addComment, like } from '../../reducers/feedReducer'
import useField from '../../hooks/useField'
import Comments from './Comments'
import LikeButton from '../universal/LikeButton'

import './Post.css'
import '../Animation.css'

const Post = (props) => {
  const [comment, resetComment] = useField('text')

  if(props.post === undefined || Object.entries(props.post).length === 0) {
    return null
  }
  
  const sendComment = (event) => {
    event.preventDefault()
    props.addComment(props.post.type, props.post._id, comment.value)
    resetComment()
  }

  const lineBreaks = props.post.content ? (props.post.content.match(/\n/g) || []).length : 0

  return ( <div className='post-component fade-in-fast'>
    <table>
      <tbody>
        <tr>
          <td>
            <div className='post-component-header'>
              {props.post.user.picture && props.post.user.picture !== '' ?
                <Image width='32px' height='32px' circular src={props.post.user.picture} />
                : <Icon name='user' /> }
            </div>
          </td>
          <td>
            <div className='post-component-header'>
              <strong><Link to={`/profile/${props.post.user.id}`}>{props.post.user.username}</Link></strong>
            </div>
          </td>
          {props.post.type === 'doneworkout' ? <td><div className='div-style'><p>{` did a workout`}</p></div></td> : null}
        </tr>
      </tbody>
    </table>
    <div className='div-style2'>
      {(props.post.picture && props.post.picture !== '') || lineBreaks > 10 
        ? <p>{props.post.content}</p> : <h3>{props.post.content}</h3>}
    </div>
    {props.post.picture && props.post.picture !== '' ? <Image size='big' src={props.post.picture} /> : null }
    <Comments data-testid='comments' comments={props.post.comments} showAll={false} postid={props.post._id} />
    <table><tbody>
      <tr>
        <td>        
          <LikeButton data-testid='likebutton' like={props.like} 
            likes={props.post.likes.length} type={props.post.type} id={props.post._id} />
        </td>
        <td width='100%'>
          <form onSubmit={sendComment}>
            <Input data-testid='comment-input' id='comment-input' fluid size='small' 
              icon={{ name: 'comment' }} {...comment} placeholder='Comment' />
          </form>
        </td>
      </tr>
    </tbody></table>
  </div> )
}

export default connect(null, { addComment, like })(withRouter(Post))