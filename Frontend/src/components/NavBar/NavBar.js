import React, { useContext } from 'react'
import { UserContext } from '../../App'
import { Link } from 'react-router-dom'
const NavBar = () => {
  const { user, dispatchUser } = useContext(UserContext)
  return (
    <div>
      <div>
        <p>Currently logged in as: {user.name}</p>
      </div>
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
        <Link to='/'>
          <button onClick={() => dispatchUser({ type: 'LOGOUT' })}>
            Logout
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NavBar
