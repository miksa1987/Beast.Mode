import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const LikeButton = (props) => {
  return (
    <div>
      <Button size='small' animated='fade' color='green' onClick={props.like}>
        <Button.Content visible><Icon name='like' /></Button.Content>
        <Button.Content hidden>{props.likes}</Button.Content>
      </Button>
    </div>
  )
}

export default LikeButton