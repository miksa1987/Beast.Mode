import React from 'react'
import { Button } from 'semantic-ui-react'
import LikeButtonSVG from './buttons/LikeButton'

const LikeButton = (props) => {
  return (
    <div>
      <Button compact data-testid='likebutton' id='likebutton' size='small' animated='fade' color='green' 
        onClick={() => props.like(props.type, props.id)}>
        <Button.Content visible><LikeButtonSVG /></Button.Content>
        <Button.Content hidden>{props.likes}</Button.Content>
      </Button>
    </div>
  )
}

export default LikeButton