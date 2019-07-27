import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, TextArea, Button, Checkbox, Icon } from 'semantic-ui-react'
import parser from '../../service/parser'
import communicationService from '../../service/communication'
import { addToFeed } from '../../reducers/feedReducer'
import useOrientation from '../../hooks/useOrientation'
import useField from '../../hooks/useField'
import './Newpost.css'

const Newpost = (props) => {
  const [isWorkout, setIsWorkout] = useState(props.isWorkout)
  const [text, resetText] = useField('text')
  //const [textContent, setTextContent] = useState('')
  const [file, setFile] = useState('')

  const orientation = useOrientation()

  const style = {
    resize: 'none'
  }

  // Will think about this...
  //const changeText = (event) => {
  //  setTextContent(event.target.value)
  //  console.log(textContent)
  //  if (parser.isWorkout(textContent)) {
  //    setIsWorkout(true)
  //  } else {
  //    setIsWorkout(false)
  //  }
  //  console.log(isWorkout)
  //}

  const workoutToggleChange = (event, data) => setIsWorkout(data.checked)

  const post = async (event) => {
    event.preventDefault()

    const data = new FormData()
    data.append('content', text.value)
    data.append('image', file)
    data.append('user', props.currentUser.id)
    data.append('likes', 0)
    isWorkout ? data.append('type', 'workout') : data.append('type', 'post')
    isWorkout ? post.type = 'workout' : post.type = 'post'
    console.log(data)

    const header = {
      'content-type': 'multipart/form-data'
    }
    let newPost = {}

    if(post.type === 'post') newPost =  await communicationService.post('/posts/new', data, header)
    if(post.type === 'workout') newPost = await communicationService.post('/workouts/new', data, header)
    if(post.type === 'doneworkout') newPost = await communicationService.post('/doneworkouts/new', data, header)

    resetText()
    props.setShowNewpost(false)
  }

  return ( <div className={orientation === 'portrait' ? 'mobile' : 'desktop'}>
      <Form onSubmit={post}>
        <table>
          <tbody>
            <tr>
              {orientation !== 'portrait' && 
                <td>
                <Button circular icon='close' style={{ width: '36px'}} color='red'
                  onClick={() => props.setShowNewpost(false)} />
                </td>
              }
              <td className="input-style">
                <input type='file' onChange={({ target }) => setFile(target.files[0])} />
              </td>
              <td>
              <Button type='submit' className="button-style">Post!</Button>
              </td>
            </tr>
          </tbody>
        </table>
        <TextArea style={style} {...text} rows={12} placeholder='What have you done?! (tip: you can use hashtags!)' />
        { isWorkout ? <><Checkbox toggle name='workoutToggle' onChange={workoutToggleChange} /><strong>Did it!</strong></> : null }
      </Form>
  </div> )
}

const mapStateToProps = (state) => {
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps, { addToFeed })(Newpost)