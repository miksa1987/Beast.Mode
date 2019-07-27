import React from 'react'
import { Button, Input, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Comment from './Comment'
import './MobileViewpost.css'

const MobileViewpost = (props) => {
  if(!props.post.content) {
    return ( <div></div> )
  }

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
          {props.post.type === 'doneworkout' ? <td><div className='div-style'><p>{` did a workout`}</p></div></td> : null}
        </tr>
      </tbody>
    </table>
    <p>{props.post.content}</p>
    <img src={props.post.picture} width='100%' alt='pic' /> 
    <div className='div-style'>
      <strong>Comments:</strong>
        {props.post.comments.map((c, i) => <Comment key={c._id} comment={c.content} user={c.user} />)} 
    </div>
    <table><tbody>
      <tr>
        <td>        
          <Button size='small' color='green' icon onClick={() => props.like(props.post.type, props.post._id)}>
            <Icon name='like' />
          </Button>
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