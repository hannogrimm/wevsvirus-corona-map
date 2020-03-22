import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to="/">
      <div style={{ width: 200, height: 60, background: '#000' }} />
    </Link>
  )
}

export default Logo
