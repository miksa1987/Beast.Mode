import React from 'react'
import {Segment} from 'semantic-ui-react'

const Dashboard  = (props) => {
  return ( <div>
    <Segment>
      <table><tbody><tr>
        <td><img src={props.user.picture} alt='user' /></td>
        <td><strong>{props.user.username}</strong>
        <p>{props.user.info}</p></td>
      </tr></tbody></table>
    </Segment>
    <table><tbody>
      <tr>
      <td><Segment>
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
    </Segment></td>
    <td><Segment>
      <img src='img/user.jpg' alt='HEE' />
      <p>So this is an update.</p>
    </Segment></td>
    </tr>
    <tr>
    <td><Segment>
      <img src='img/user.jpg' alt='HEE' />
      <p>So this is an update.</p>
    </Segment></td>
    <td><Segment>
      <img src='img/user.jpg' alt='HEE' />
      <p>So this is an update.</p>
    </Segment></td>   
    </tr></tbody></table>
  </div> )
}

export default Dashboard