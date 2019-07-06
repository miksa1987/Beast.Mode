import React, { useState, useEffect } from 'react'
import moment from 'moment'
import m from 'moment-duration-format'

const Timer = (props) => {
  const [time, setTime] = useState('00:00:00')
  const secs = props.secs

  useEffect(() => {
    const duration = moment.duration(secs, 'seconds')
    const formatted = moment.duration.format([duration], 'hh:mm:ss')
    setTime(formatted)
  }, [secs])

  return ( <div>
    <h3>Workout time: {time}</h3>
  </div> )
}

export default Timer