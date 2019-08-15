import React from 'react'
import moment from 'moment'
import 'moment-duration-format'

const Timer = (props) => {
  const time = moment.duration(props.secs, 'seconds').format('hh:mm:ss')

  return ( <div>
    <h3>Workout time: {props.secs < 60 ? `00:${time}` : time}</h3>
  </div> )
}

export default Timer