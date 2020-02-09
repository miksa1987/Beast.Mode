import React from 'react'
import styled from 'styled-components'
import Animation from '../Animation'
import { Input, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { addComment, like } from '../../reducers/feedReducer'
import useField from '../../hooks/useField'
import Comments from './Comments'
import LikeButton from '../universal/LikeButton'

const PostBase = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: 15px 0px;
  white-space: pre-line;
  text-align: top;
  background-color: #ffffff;
`

const PostTitleOrBottom = styled.div`
  display: grid;
  grid-template: 3rem / 4rem 1fr;
`

const Post = (props) => {
  const [comment, resetComment] = useField('text')
  const sendComment = props.sendComment ? props.sendComment : props.addComment
  const sendLike = props.sendLike ? props.sendLike : props.like

  if(props.post === undefined || Object.entries(props.post).length === 0) {
    return null
  }
  
  const handleComment = (event) => {
    event.preventDefault()
    sendComment(props.post.type, props.post._id, comment.value)
    resetComment()
  }

  return ( 
    <Animation>
      <PostBase>
        
        <PostTitleOrBottom>
          {props.post.user.picture && props.post.user.picture !== '' ?
            <Image width='32px' height='32px' circular src={props.post.user.picture} />
            : <Icon name='user' /> }
          <strong>
            <Link to={`/profile/${props.post.user.id}`}>{props.post.user.username}</Link>
          </strong>
        </PostTitleOrBottom>

        <p>{props.post.content}</p>
        {props.post.picture && props.post.picture !== '' ? <Image size='big' src={props.post.picture} /> : null }
        <Comments data-testid='comments' comments={props.post.comments} showAll={false} postid={props.post._id} />
        
        <PostTitleOrBottom>
          <LikeButton data-testid='likebutton' like={sendLike} 
            likes={props.post.likes.length} type={props.post.type} id={props.post._id} />
          <form onSubmit={handleComment}>
            <Input data-testid='comment-input' id='comment-input' fluid size='small' 
              icon={{ name: 'comment' }} {...comment} placeholder='Comment' />
          </form>
        </PostTitleOrBottom>
      
      </PostBase>
    </Animation>
  )
}

export default connect(null, { addComment, like })(withRouter(Post))