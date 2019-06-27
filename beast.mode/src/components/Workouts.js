import React from 'react'

const Workouts = (props) => {
  return ( <div>
    <strong>Find workouts...<br/></strong>
    <form width='100%'>
      <input name='wrkout' />
      <button type='submit'>Find</button>
    </form>
  </div> )
}

export default Workouts