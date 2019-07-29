import React from 'react'
import './Spinner.css'

const Spinner = () => {
  return (
    <div className='spinner'>
      <div className='base' />
      <div className='spinner-sector spinner-sector-red' />
      <div className='spinner-sector spinner-sector-darkred' />
      <div className='spinner-sector spinner-sector-darkerred' />
    </div>
  )
}

export default Spinner