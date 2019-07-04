import React from 'react'
import Post from './Post'

const Dashboard  = (props) => {
  const userTitleStyle = {
    verticalAlign: 'top'
  }

  const divStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  }

  return ( <div>
    <table><tbody><tr>
      <td><img src={props.user.picture} alt='user' /></td>
      <td style={userTitleStyle}><strong style={userTitleStyle}>{props.user.username}</strong></td>
    </tr></tbody></table>
    <div style={divStyle}>
      <table><tbody>
      <tr>
      <td><img src={props.user.picture} alt='user' /></td>
      <td><img src={props.user.picture} alt='user' /></td>
      <td><img src={props.user.picture} alt='user' /></td>
        </tr>
        <tr>
        <td><img src={props.user.picture} alt='user' /></td>
        <td><img src={props.user.picture} alt='user' /></td>
        <td><img src={props.user.picture} alt='user' /></td>
        </tr>
      </tbody></table>
    </div>
  </div> )
}

export default Dashboard