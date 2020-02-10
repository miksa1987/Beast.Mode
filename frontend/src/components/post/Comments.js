import React from 'react'
import styled from 'styled-components'
import Animation from '../Animation'
import { Link } from 'react-router-dom'

const CommentsBase = styled.div`
  background-color: #eeeeee;
  margin: 5px;
  margin-top: 20px;
  padding: 10px;
  width: calc(100% - 10px);
  max-height: 30vh;
  overflow: auto;
`

const Comments = (props) => {
  const shownComments = props.comments.length > 3 
    ? props.comments.slice(props.comments.length -3, props.comments.length) : props.comments

  if (props.comments.length === 0) {
    return ( <div></div> )
  }

  return ( 
    <Animation>
      <CommentsBase data-testid='comments'>
        <h4>Comments:</h4>
        {(!props.showAll && props.comments.length > 3) 
          && <Link to={`/post/${props.postid}`}>Show all comments</Link>}

        {!props.showAll && shownComments.map((comment, i) => 
          <Animation key={i}>
            <Link to={`/profile/${comment.userid}`}><strong>{comment.user}</strong></Link>{` `}{comment.content}
          </Animation> )}

        {props.showAll && props.comments.map((comment, i) => 
          <Animation key={i}>
            <Link to={`/profile/${comment.userid}`}><strong>{comment.user}</strong></Link>{` `}{comment.content}
          </Animation> )}
      
      </CommentsBase>
    </Animation>
  )
}

export default Comments