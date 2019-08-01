import React, { useEffect } from 'react'
import { Button, Input, Image, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import useField from '../../hooks/useField'
import Comments from './Comments'
import useOrientation from '../../hooks/useOrientation'
import { initCurrentPost } from '../../reducers/currentPost'
import { addComment, like } from '../../reducers/feedReducer'
import MobileViewpost from './MobileViewpost'
import LikeButton from '../universal/LikeButton'
import './Viewpost.css'
import '../Animation.css'

const Viewpost = (props) => {
  const orientation = useOrientation()

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

  return ( <div className='viewpost-component component-width fade-in-fast'>
    <table className='table-style'><tbody>
      <tr>
        <td className='pic-style'>
          <img src={props.post.picture} width='100%' alt='pic' />
        </td>

        <td className='post-style'>
          <table className='table-style'>
            <tbody>
              <tr>
                <td>
                  
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <div className='title-style'>
                          {props.post.user.picture && props.post.user.picture !== '' ?
                            <Image width='32px' height='32px' circular src={props.post.user.picture} />
                            : <Icon name='user' />}
                          </div>    
                        </td>
                        <td>
                          <div className='title-style'><strong>{props.post.user.username}</strong></div>
                        </td>     
                      </tr>
                    </tbody>
                  </table>
                  
                </td>         
              </tr>
              <tr>
                <td>
                  <p>{props.post.content}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <Comments comments={props.post.comments} showAll={true} postid={props.post._id} />
                </td>
              </tr>
              <tr>
                <td>
                  <table className='table-style'>
                    <tbody>
                      <tr>
                        <td className='table-style'>
                          <form onSubmit={sendComment}>
                            <Input fluid size='small' icon={{ name: 'comment' }} {...comment} placeholder='Comment' />
                          </form>
                        </td>
                        <td>       
                          <LikeButton like={props.like} likes={props.post.likes.length} />
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
      </tbody>
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