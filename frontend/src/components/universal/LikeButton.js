import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const LikeButton = (props) => {
  return (
    <div>
      <Button data-testid='likebutton' id='likebutton' size='small' animated='fade' color='green' 
        onClick={() => props.like(props.type, props.id)}>
        <Button.Content visible><Icon name='like' /></Button.Content>
        <Button.Content hidden>{props.likes}</Button.Content>
      </Button>
    </div>
  )
}

export default LikeButton