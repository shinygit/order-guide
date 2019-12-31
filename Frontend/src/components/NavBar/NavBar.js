import React from 'react'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <div>
      <Link to='/login'>
        <button>Login</button>
      </Link>
      <Link to='/register'>
        <button>Register</button>
      </Link>
      <Link to='/'>
        <button>Home</button>
      </Link>
    </div>
  )
}

export default NavBar
