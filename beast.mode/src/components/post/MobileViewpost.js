import React from 'react'
import { Button, Input, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Comment from './Comment'

const MobileViewpost = (props) => {
  const elementStyle = {
    minWidth: '95%',
    maxHeight: '30%',
    align: 'top',
    maxWidth: '95%',
    margin: 'auto',
    marginTop: '25px',
    border: '1px solid #dddddd',
    whiteSpace: 'pre-line',
    textAlign: 'top',
    borderRadius: '3px',
    backgroundColor: '#ffffff'
  }

  const divStyle = {
    marginTop: '10px',
    marginLeft: '10px',
    marginBottom: '10px'
  }
  
  const divStyle2 = {
    marginTop: '10px',
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '10px'
  }

  const commentStyle = {
    verticalAlign: 'top',
    overflowY: 'auto',
    width: '100%'
  }

  if(!props.post.content) {
    return ( <div></div> )
  }

  return ( <div style={elementStyle}>     
    <table>
      <tbody>
        <tr>
          <td>
            <div style={divStyle}>
              {props.post.user.picture && props.post.user.picture !== '' ?
                <Image width='32px' height='32px' circular src={props.post.user.picture} />
                : <Icon name='user' /> }
            </div>
          </td>
          <td>
            <div style={divStyle}>
              <strong><Link to={`/profile/${props.post.user.id}`}>{props.post.user.username}</Link></strong>
            </div>
          </td>
          {props.post.type === 'doneworkout' ? <td><div style={divStyle}><p>{` did a workout`}</p></div></td> : null}
        </tr>
      </tbody>
    </table>
    <p>{props.post.content}</p>
    <img src={props.post.picture} width='100%' alt='pic' /> 
    <div style={commentStyle}>
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