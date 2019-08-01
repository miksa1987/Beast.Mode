import React from 'react'
import './Spinner.css'

const Spinner = () => {
  return (
    <div className='spinner'>
      <div className='base' />
      <div className='spinner-sector spinner-sector-red0' />
      <div className='spinner-sector spinner-sector-red1' />
      <div className='spinner-sector spinner-sector-red2' />
      <div className='spinner-sector spinner-sector-red3' />
      <div className='spinner-sector spinner-sector-red4' />
    </div>
  )
}

export default Spinner