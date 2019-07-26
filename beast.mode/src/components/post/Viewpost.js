import React, { useEffect } from 'react'
import { Button, Input, Divider, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import useField from '../../hooks/useField'
import Comment from './Comment'
import useOrientation from '../../hooks/useOrientation'
import { initCurrentPost } from '../../reducers/currentPost'
import { addComment, like } from '../../reducers/feedReducer'
import MobileViewpost from './MobileViewpost'
import './Viewpost.css'

const Viewpost = (props) => {
  const orientation = useOrientation()

  const divStyle = {
    width: '80%',
    padding: '0px 0px 0px 0px',
    border: '1px solid #dddddd',
    borderRadius: '4px',
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
  
  const [comment, resetComment] = useField('text')

  const sendComment = (event) => {
    event.preventDefault()
    props.addComment(props.post.type, props.post._id, comment.value)
    resetComment()
  }

  useEffect(() => {
    props.initCurrentPost(props.type, props.id)
  }, [])

  if (!props.post.content) {
    return ( <div></div> )
  }

  if (orientation === 'portrait') {
    return ( <MobileViewpost post={props.post} sendComment={sendComment} comment={comment} like={props.like} /> )
  }

  return ( <div className='viewpost-component component-width'>
    <table className='table-style'>
      <tr>

        <td className='pic-style'>
          <img src={props.post.picture} width='100%' alt='pic' />
        </td>

        <td className='post-style'>
          <table className='table-style'>
            <tbody>
              <tr>
                <td className='title-style'>
                  <strong>{props.post.user.username}</strong>
                </td>
                <td className='title-style'>

                </td>
              
              </tr>
              <tr>
                <td>
                  <p>{props.post.content}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <table className='table-style'>
                    <tbody>
                      <tr>
                        <td width='100%'>
                          <form onSubmit={sendComment}>
                            <Input fluid size='small' icon={{ name: 'comment' }} {...comment} placeholder='Comment' />
                          </form>
                        </td>
                        <td>        
                          <Button size='small' color='green' icon onClick={() => props.like(props.post.type, props.post._id)}>
                            <Icon name='like' />
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </table>
  </div> 
   )
}

const mapStateToProps = (state) => {
  return {
    post: state.currentPost
  }
}

export default connect(mapStateToProps, { initCurrentPost, addComment, like })(Viewpost)