import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import communicationService from '../../service/communication'
import './FileInput.css'


const FileInput = (props) => {
  const addFile = () => {
    const input = document.getElementById('real-input')
    input.click()
  }

  const postFile = async (event) => {
    const chosenFile = event.target.files[0]
    if (chosenFile !== props.file) {
      props.setFile(chosenFile)
      props.setImage(await communicationService.postImage(chosenFile))
    }
  }

  return (
    <div>
      <input type='file' id='real-input' onChange={postFile} />
        {props.compact ? <Button type='button' icon onClick={addFile}>
          <Icon name='image' />
          Upload a picture
        </Button>
        :<Button fluid type='button' compact icon onClick={addFile}>
          <Icon name='image' />
          Upload a picture
        </Button> }
    </div>
  )
}

export default FileInput