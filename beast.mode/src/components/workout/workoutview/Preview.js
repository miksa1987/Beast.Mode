import React from 'react'
import { Image, Input, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import './Preview.css'
import Comments from '../../post/Comments'
import LikeButton from '../../universal/LikeButton'
import useField from '../../../hooks/useField'
import { likeWorkout, commentWorkout } from '../../../reducers/currentWorkout'
import useWindowSize from '../../../hooks/useWindowSize'

export const Preview = (props) => {
  const screen = useWindowSize()
  const [comment, resetComment] = useField('text')

  console.log(props.workout)

  const addComment = (event) => {
    event.preventDefault()
    props.commentWorkout(comment.value, props.workout.id)
    resetComment()
  }
  
  if (screen.width < screen.height) {
    return ( <div className='preview-component'>
      <h2>Preview workout</h2>
      <Image floated='right' size='tiny' rounded
        src={props.workout.picture !== '' ? props.workout.picture : '/img/workout.jpg'}  />
      <h3>{props.workout.textcontent}</h3>
      <Comments showAll={true} comments={props.workout.comments} />

      <table className='full-width'>
        <tbody>
          <tr>
            <td>
              <LikeButton likes={props.workout.likes.length} 
                like={props.likeWorkout} id={props.workout.id} type='workout' />
            </td>
            <td className='full-width'>
              <form onSubmit={addComment}>
                <Input fluid size='small' icon={{ name: 'comment' }} data-testid='comment'
                  placeholder='Comment' {...comment} />
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>)
  }

  return ( <div className='preview-component'>
    <h2>Preview workout</h2>
    <table className='preview-component'>
      <tbody>
        <tr>
          <td className='content-style'>
            <h3>{props.workout.textcontent}</h3>
            <Comments showAll={true} comments={props.workout.comments} />
          </td>
          <td className='fullwidth rightcolumn-style'>
            <Image rounded src={(props.workout.picture && props.workout.picture) !== '' ?
            props.workout.picture : '/img/workout.jpg'} />
          </td>
        </tr>
      </tbody>
    </table>
    <table className='full-width'>
      <tbody>
        <tr>
          <td>
            <LikeButton likes={props.workout.likes.length}  
              like={props.likeWorkout} id={props.workout.id} type='workout' />
          </td>
          <td className='full-width'>
            <form onSubmit={addComment}>
              <Input fluid size='small' icon={{ name: 'comment' }} placeholder='Comment'
                data-testid='comment' {...comment} />
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  </div>)
}

export default connect(null, { likeWorkout, commentWorkout })(Preview)