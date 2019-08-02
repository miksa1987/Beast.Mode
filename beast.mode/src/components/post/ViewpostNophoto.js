import React from 'react'
import { Input, Image, Icon } from 'semantic-ui-react'
import LikeButton from '../universal/LikeButton'
import Comments from './Comments'
import useField from '../../hooks/useField'
import './Viewpost.css'
import '../Animation.css'

const ViewpostNophoto = (props) => {
  const [comment, resetComment] = useField('text')

  const sendComment = (event) => {
    event.preventDefault()
    props.comment(props.post.type, props.post._id, comment.value)
    resetComment()
  }

  return (
    <div className='viewpost-nophoto-component fade-in-fast'>
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
  </div>
  )  
}

export default ViewpostNophoto