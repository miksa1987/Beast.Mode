import React from 'react'
import { Button, Input, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Comments from './Comments'
import LikeButton from '../universal/LikeButton'
import './MobileViewpost.css'

const MobileViewpost = (props) => {
  if(!props.post.content) {
    return ( <div></div> )
  }
  console.log(props.post._id)

  return ( <div className='viewpost-element'>     
    <table>
      <tbody>
        <tr>
          <td>
            <div className='div-style'>
              {props.post.user.picture && props.post.user.picture !== '' ?
                <Image width='32px' height='32px' circular src={props.post.user.picture} />
                : <Icon name='user' /> }
            </div>
          </td>
          <td>
            <div className='div-style'>
              <strong><Link to={`/profile/${props.post.user.id}`}>{props.post.user.username}</Link></strong>
            </div>
          </td>
          {props.post.type === 'doneworkout' ? <td><div className='div-style'><p>{`did a workout`}</p></div></td> : null}
        </tr>
      </tbody>
    </table>
    <p>{props.post.content}</p>
    <img src={props.post.picture} width='100%' alt='pic' />   
    <Comments comments={props.post.comments} showAll={true} postid={props.post._id} /> 
    <table><tbody>
      <tr>
        <td>
          <LikeButton like={props.like} likes={props.post.likes.length} id={props.post._id} type={props.post.type} />
        </td>
        <td width='100%'>
          <form onSubmit={props.sendComment}>
            <Input fluid size='small' icon={{ name: 'comment' }} {...props.comment} placeholder='Comment' />
          </form>
        </td>
      </tr>
    </tbody></table>
  </div> )
}

export default MobileViewpost