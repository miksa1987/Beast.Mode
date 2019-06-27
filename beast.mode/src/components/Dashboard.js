import React from 'react'
import {Segment} from 'semantic-ui-react'

const Dashboard  = (props) => {
  return ( <div>
    <Segment>
      <img src='img/user.jpg' alt='user' />
      <strong>USERNAME TÄNNE</strong>
    </Segment>
    <table><tbody>
      <tr>
      <td><Segment>
      <table><tbody>
      <tr>
          <td><img src='img/user.jpg' alt='user' /></td>
          <td><img src='img/user.jpg' alt='user' /></td>
          <td><img src='img/user.jpg' alt='user' /></td>
        </tr>
        <tr>
          <td><img src='img/user.jpg' alt='user' /></td>
          <td><img src='img/user.jpg' alt='user' /></td>
          <td><img src='img/user.jpg' alt='user' /></td>
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