import React from 'react'
import { Button, Segment, Input } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'
import './FeedPost.css'


// Don't look further, it's a mess!


const elementStyle = {
  minWidth: '90%',
  margin: 'auto',
  backgroundColor: '#aaaaaa',
  maxWidth: '90%',
  paddingTop: '15px',
  flexGrow: '1',
  flexShrink: '1',
  flexBasis: '100%',
  whiteSpace: 'pre-line'
}

const contentStyle = {
  width: '32%',
  minWidth: '32%',
}

const lowerStyle = {
  width: '100%'
}

const FeedPost = (props) => {
  const comment = (event) => {
    event.preventDefault()
  }

  if(props.post === undefined) {
    return null
  }
  return ( <div style={elementStyle}>
    <Segment>
    <table>
      <tbody>
      <tr>
        <td width='32%' ><img width='32px' height='32px' 
          src={props.post.user.picture && props.post.user.picture !== '' 
          ? props.post.user.picture : '/img/ui/dashboard.png'} alt='pic' />
          <Link to={`/profile/${props.post.user.username}`}><strong>{props.post.user.username}</strong></Link>
        </td>
        </tr>
        <tr>
          <td width='32%' style={contentStyle}>
            {props.post.picture && props.post.picture !== '' 
            ? <img src={props.post.picture} alt='pic' /> : null} 
          </td>
          <td width='32%' style={contentStyle} align='center'>
            <p>{props.post.content}</p>
          </td>
          <td width='32%' style={contentStyle} align='right'>
            comments here
          </td>
        </tr>
      </tbody>
    </table>
    <table style={lowerStyle}>
      <tbody>
        <tr>
        
          {props.post.type === 'workout' ?
          <td width='150px'> 
            <Button color='red' onClick={() => props.history.push(`/doworkout/${props.post._id}`)}>Do this workout</Button>
          </td>
            : null}
          <td width='70px'>
            <Button>Like</Button>
          </td>
          <td>
            <form onSubmit={comment}>
              <Input fluid size='small' action={{ icon: 'comment' }} />
            </form>
          </td>
        </tr>
      </tbody>
    </table>

    
    </Segment>
  </div> )
}

export default withRouter(FeedPost)