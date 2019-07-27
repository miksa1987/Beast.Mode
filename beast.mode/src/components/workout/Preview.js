import React from 'react'
import { Image, Input, Button, Icon } from 'semantic-ui-react'
import './Preview.css'
import Comments from '../post/Comments'
import useOrientation from '../../hooks/useOrientation'

const Preview = (props) => {
  const orientation = useOrientation()

  console.log(props.workout)
  
  if (orientation === 'portrait') {
    return ( <div className='preview-component'>
      <h2>Preview workout</h2>
      {(props.workout.picture && props.workout.picture !== '') &&
        <Image floated='right' src={props.workout.picture} size='medium' />}
      <h3>{props.workout.textcontent}</h3>
      <Comments comments={props.workout.comments} />
    </div>)
  }

  return ( <div className='preview-component'>
    <h2>Preview workout</h2>
    <table className='content-style'>
      <tbody>
        <tr>
          <td className='content-style'>
            <h3>{props.workout.textcontent}</h3>
          </td>
          <td className='fullwidth'>
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='medium' />
            {(props.workout.picture && props.workout.picture !== '') &&
              <Image floated='right' src={props.workout.picture} size='medium' />}
            <Comments comments={props.workout.comments} />           
          </td>
        </tr>
      </tbody>
    </table>
    <table className='fullwidth'>
      <tbody>
        <tr>
          <td>
            <Button size='small' color='green' icon onClick={() => props.like(props.post.type, props.post._id)}>
              <Icon name='like' />
            </Button>
          </td>
          <td>
            <form onSubmit={(event) => event.preventDefault()}>
              <Input fluid size='small' icon={{ name: 'comment' }} placeholder='Comment' />
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  </div>)
}

export default Preview