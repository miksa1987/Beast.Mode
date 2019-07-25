import React from 'react'
import './Comments.css'

const Comments = (props) => {
  const shownComments = props.comments.length > 3 
  ? props.comments.slice(props.comments.length -3, props.comments.length) : props.comments

  if (props.comments.length === 0) {
    return ( <div className="component">
      <strong>No comments yet!</strong>
    </div> )
  }

  return ( <div className="component">
    {shownComments.map((comment, i) => 
      <div key={i}>
        <strong>{comment.user}</strong>{` `}{comment.content}
      </div> )}
  </div> )
}

export default Comments