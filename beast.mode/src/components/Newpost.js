import React from 'react'
import {Segment, Form, TextArea, Button} from 'semantic-ui-react'

const Newpost = (props) => {
  return ( <div>
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