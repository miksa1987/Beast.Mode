import React, { useEffect } from 'react'
import { Button, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Comment from './Comment'
import { initCurrentPost } from '../../reducers/currentPost'
import { addComment, like } from '../../reducers/feedReducer'

const Viewpost = (props) => {
  
  const tableStyle = {
    width: '100%',
    align: 'center',
    margin: 'auto'
  }

  const picStyle = {
    width: '70%'
  }

  const postStyle = {
    width: '100%'
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

  useEffect(() => {
    props.initCurrentPost(props.type, props.id)
  }, [])

  if(!props.post.content) {
    return ( <div></div> )
  }

  return ( <div>
    <table style={tableStyle}>
      <tbody>
        <tr>
          <td style={picStyle}>
            <img src={props.post.picture} width='100%' alt='pic' />
          </td>
          <td style={postStyle}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <strong>{props.post.user.username}</strong>
                  <p>{props.post.content}</p>      
                </td>
                </tr>
                <tr>
                  <td style={commentsStyle}>
                    <div style={commentStyle}>
                      <strong>Comments:</strong>
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
  </div> )
}

const mapStateToProps = (state) => {
  return {
    post: state.currentPost
  }
}

export default connect(mapStateToProps, { initCurrentPost, addComment, like })(Viewpost)