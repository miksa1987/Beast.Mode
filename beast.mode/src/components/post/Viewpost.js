import React, { useEffect } from 'react'
import { Button, Input, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Comment from './Comment'
import { initCurrentPost } from '../../reducers/currentPost'
import { addComment, like } from '../../reducers/feedReducer'

const Viewpost = (props) => {
  const divStyle = {
    width: '80%',
    padding: '0px 0px 0px 0px',
    border: '1px solid #cccccc',
    align: 'center',
    margin: 'auto'
  }

  const picStyle = {
    width: '70%',
    padding: '0px 0px 0px 0px'
  }

  const postStyle = {
    width: '100%',
    verticalAlign: 'top',
    padding: '0px 0px 0px 0px'
  }


  const commentsStyle = {
    display: 'flex',
    align: 'right',
    margin: '8px',
    width: '100%',
    height: '85%',
    minHeight: '85%',
    maxHeight: '85%',
    overflowY: 'auto',
    padding: '0px 0px 0px 0px'
  }

  const contentStyle = {
    width: '100%'
  }

  const commentStyle = {
    verticalAlign: 'top',
    overflowY: 'auto',
    width: '100%',
    minHeight: '85%',
    height: '85%',
    display: 'block',
    padding: '0px 0px 0px 0px'
  }

  useEffect(() => {
    props.initCurrentPost(props.type, props.id)
  }, [])

  if(!props.post.content) {
    return ( <div></div> )
  }

  return ( <div style={divStyle}>
    <table style={postStyle}>
      <tbody>
        <tr>
          <td style={picStyle}>
            <img src={props.post.picture} width='100%' alt='pic' />
          </td>
          <td style={postStyle}>
            <table style={contentStyle}>
              <tbody>
                <tr>
                  <td>
                    <strong>{props.post.user.username}</strong>
                  <p>{props.post.content}</p>      
                </td>
                </tr>
                <tr>
                  <td><Divider /></td>
                </tr>
                <tr>
                  <td style={commentsStyle} height='80%'>
                    <table style={commentStyle}>
                      <tbody>
                        {props.post.comments.map((c, i) => <tr key={c._id}><td><Comment comment={c.content} user={c.user} /></td></tr>)} 
                      </tbody>
                    </table>
                  </td>
              </tr>
              <tr>
                <td>
                  <Button fluid>Like</Button>
                </td>
              </tr>
              <tr>
                <td>
                  <Input fluid size='small' placeholder='Write comment' />
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