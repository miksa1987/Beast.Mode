import React from 'react'
import { Link } from 'react-router-dom'
import './Comments.css'
import '../Animation.css'

const Comments = (props) => {
  const shownComments = props.comments.length > 3 
  ? props.comments.slice(props.comments.length -3, props.comments.length) : props.comments

  if (props.comments.length === 0) {
    return ( <div className="component">
      <strong>No comments yet!</strong>
    </div> )
  }

  return ( <div className='component'>
    {(!props.showAll && props.comments.length > 3) 
      && <Link to={`/post/${props.postid}`}>Show all comments</Link>}
    {!props.showAll && shownComments.map((comment, i) => 
      <div key={i} className='fade-in-fast'>
        <Link to={`/profile/${comment.userid}`}><strong>{comment.user}</strong></Link>{` `}{comment.content}
      </div> )}
    {props.showAll && props.comments.map((comment, i) => 
      <div key={i} className='fade-in-fast'>
        <Link to={`/profile/${comment.userid}`}><strong>{comment.user}</strong></Link>{` `}{comment.content}
      </div> )}
  </div> )
}

export default Comments