import React from 'react'
import { NavLink } from 'react-router-dom'

function FallbackPage() {
  return (
    <div className='container gray-text center'>
        <h3>OOPS!</h3>
        <p>Currently you cannot view this page offline</p>
        <NavLink to='/'>Go to Homepage</NavLink>
    </div>
  )
}

export default FallbackPage