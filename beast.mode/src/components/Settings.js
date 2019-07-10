import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Input, Button } from 'semantic-ui-react'

const Settings = (props) => {
  const [file, setFile] = useState('')

  if(props.currentUser === undefined) {
    return ( <div>Loading...</div> )
  }

  return ( <div>
    <h2>{props.currentUser.username}</h2>
    <table>
      <tbody>
        <tr>
          <td>
            <form>
              Update your profile picture:<br/>
              <input type='file' onChange={({target}) => setFile(target.files[0])} />
            </form>
          </td>
        </tr>
        <tr>
          <td>
            <Input size='small' name='email' width='8' placeholder={props.currentUser.email ? props.currentUser.email : 'No email set!'} />
          </td>
        </tr>
        <tr>
          <td>
            <Input size='small' name='email' width='8' placeholder={props.currentUser.email ? props.currentUser.email : 'No email set!'} />
          </td>
        </tr>
      </tbody>
    </table>
  </div> )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, null)(Settings)