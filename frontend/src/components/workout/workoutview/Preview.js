import React from 'react'
import { Image, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import './Preview.css'
import Comments from '../../post/Comments'
import LikeButton from '../../universal/LikeButton'
import useField from '../../../hooks/useField'
import { likeWorkout, commentWorkout } from '../../../reducers/currentWorkout'

const LikeBar = styled.div`
  display: grid;
  grid-template: 3rem / 4.5rem 1fr;
  width: 80%
  margin-top: 3rem;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const StyledImage = styled.img`
  width: 100%;
  border-radius: 10px;

  @media screen and (max-width: 600px) {
    object-fit: cover;
    object-position: -20% 0;
    height: 20rem;
  }
`

const Layout = styled.div`
  display: grid;
  grid-template: 100% / 35vw 65vw;
  grid-gap: 1rem;
  white-space: pre-line;
  margin-top: 2rem;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`

export const Preview = (props) => {
  const [comment, resetComment] = useField('text')

  const addComment = (event) => {
    event.preventDefault()
    props.commentWorkout(comment.value, props.workout.id)
    resetComment()
  }
  
  return ( 
    <Layout>
      <div>
      <h2>Preview workout</h2>
      <StyledImage src={(props.workout.picture && props.workout.picture) !== '' ?
        props.workout.picture : '/img/workout.jpg'} />
      </div>

      <div>
        <h3>{props.workout.textcontent}</h3>
        
        <Comments showAll={true} comments={props.workout.comments} />
            
        <LikeBar>
          <LikeButton likes={props.workout.likes.length}  
            like={props.likeWorkout} id={props.workout.id} type='workout' />
            <form onSubmit={addComment}>
              <Input fluid size='small' icon={{ name: 'comment' }} placeholder='Comment'
                data-testid='comment' {...comment} />
          </form>
        </LikeBar>
      </div>

    </Layout>
  )
}

export default connect(null, { likeWorkout, commentWorkout })(Preview)