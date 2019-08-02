import React from 'react'
import { Image, Input, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import './Preview.css'
import Comments from '../../post/Comments'
import LikeButton from '../../universal/LikeButton'
import useOrientation from '../../../hooks/useOrientation'
import useField from '../../../hooks/useField'
import { likeWorkout, commentWorkout } from '../../../reducers/currentWorkout'

const Preview = (props) => {
  const orientation = useOrientation()
  const [comment, resetComment] = useField('text')

  console.log(props.workout)

  const addComment = (event) => {
    event.preventDefault()
    props.commentWorkout(comment.value, props.workout.id)
    resetComment()
  }
  
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
            <LikeButton likes={props.workout.likes.length} like={props.likeWorkout} id={props.workout.id} type='workout' />
          </td>
          <td>
            <form onSubmit={addComment}>
              <Input fluid size='small' icon={{ name: 'comment' }} placeholder='Comment' {...comment} />
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  </div>)
}

export default connect(null, { likeWorkout, commentWorkout })(Preview)