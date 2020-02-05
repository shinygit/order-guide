import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_CURRENT_USER = gql`
  {
    me {
      username
    }
  }
`
const NavBar = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  return (
    <div>
      <div>
        <p>Currently logged in as: {data.me.username}</p>
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
          <button>Logout</button>
        </Link>
      </div>
    </div>
  )
}

export default NavBar
