import React from 'react'
import {Segment, Form, TextArea, Button} from 'semantic-ui-react'


const elementStyle = {
  minWidth: '50%',
  maxWidth: '50%',
  paddingTop: '5px',
  paddingLeft: '5px',
  flexGrow: '1',
  flexShrink: '1',
  flexBasis: '50%'
}

const Newpost = (props) => {
  return ( <div style={elementStyle}>
    <Segment>
      <Form>
        <TextArea name='post' rows={4} placeholder='What have you done?! (tip: you can use hashtags!)' />
        <Button>Got picture?</Button>
        <Button>Post!</Button>
      </Form>
    </Segment>
  </div> )
}

export default Newpost