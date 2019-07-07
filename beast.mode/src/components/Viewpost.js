import React from 'react'

const Viewpost = (props) => {
  const tableStyle = {
    width: '90%',
    align: 'center',
    margin: 'auto'
  }

  const picStyle = {
    width: '70%'
  }

  const postStyle = {
    width: '29%'
  }
  return ( <div>
    <table style={tableStyle}>
      <tr>
        <td style={picStyle}>
          <img src={props.post.picture} alt='pic' />
        </td>
        <td style={postStyle}>
          <strong>{props.post.user.username}</strong>
          <p>{props.post.content}</p>
        </td>
      </tr>
    </table>
  </div> )
}

export default Viewpost