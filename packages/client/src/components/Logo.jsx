import React from 'react'
import { Link } from 'react-router-dom'

import LogoImg from './Logo.png'

const Logo = () => {
  return (
    <Link to="/">
      <img alt="logo" src={LogoImg} width="200" />
    </Link>
  )
}

export default Logo
