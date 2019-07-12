import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { withRouter, Link } from 'react-router-dom'


const elementStyle = {
  minWidth: '95%',
  align: 'top',
  maxWidth: '95%',
  paddingTop: '15px',
  paddingLeft: '15px',
  flexGrow: '1',
  flexShrink: '1',
  flexBasis: '95%',
  whiteSpace: 'pre-line',
  textAlign: 'top'
}

const tableStyle = {
  tableLayout: 'fixed',
  wordWrap: 'break-word'
}

const picStyle = {
  margin: '8px',
  width: '20%'
}

const contentStyle = {
  verticalAlign: 'text-top',
  margin: '8px',
  width: '50%'
}


const commentStyle = {
  verticalAlign: 'text-top',
  margin: '8px',
  width: '30%'
}

const Post = (props) => {
  if(props.post === undefined) {
    return null
  }
  return ( <div style={elementStyle}>
    <Card fluid>
      <Card.Content>
        <Image floated='right' width='32px' height='32px'
          src={props.post.user.picture && props.post.user.picture !== '' 
          ? props.post.user.picture : '/img/ui/dashboard.png'} />
        <Card.Header>{props.post.user.username}</Card.Header>
        <Card.Description>
          <table style={tableStyle}><tbody><tr>
          <td style={picStyle}> 
            <Image size='small' src={props.post.picture && props.post.picture !== '' 
              ? props.post.picture : 'https://react.semantic-ui.com/images/wireframe/image.png'} />
          </td> 
          <td style={contentStyle}><p>{props.post.content}</p></td>
          <td style={commentStyle}>
            COMMENTS HERE HOHOHOH  
          </td></tr></tbody></table>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button>Like</Button>
        <Button>Comment</Button>
        {props.post.type === 'workout' ? 
          <Button color='red' onClick={() => props.history.push(`/doworkout/${props.post._id}`)}>Do this workout</Button>
          : null}
      </Card.Content>
    </Card>
  </div> )
}

export default withRouter(Post)