import React from 'react'
import { Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Photos = (props) => {
  const picContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }

  const picStyle = {
    padding: '10px 10px 10px 10px'
  }

  if (props.currentProfile.pictures.length === 0) {
    return ( <div>
    </div> )
  }

  return ( <div>
    <div style={picContainer}>
      {props.currentProfile.pictures.map(pic => 
        <Image key={pic} style={picStyle} size='small' src={pic} />)}
    </div>
  </div> )
}

const mapStateToProps = (state) => {
  return {
    currentProfile: state.currentProfile
  }
}
export default connect(mapStateToProps)(Photos)