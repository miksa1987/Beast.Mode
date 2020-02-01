import React from 'react'
import { Button, Icon, Input } from 'semantic-ui-react'
import useField from '../../hooks/useField'

const PostBottomRow = (props) => {
  const [ comment, resetComment ] = useField('text')

  const sendComment = (event) => {
    props.comment(props.type, props.id, comment.value)
    resetComment()
  }

  return (
    <div>
      <table className='table-style'>
        <tbody>
          <tr>
            <td className='table-style'>
              <form onSubmit={sendComment}>
                <Input fluid size='small' icon={{ name: 'comment' }} {...comment} placeholder='Comment' />
              </form>
            </td>
            <td>       
              <Button size='small' animated='fade' color='green' onClick={() => props.like(props.type, props.id)}>
                <Button.Content visible><Icon name='like' /></Button.Content>
                <Button.Content hidden>{props.likes}</Button.Content>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PostBottomRow