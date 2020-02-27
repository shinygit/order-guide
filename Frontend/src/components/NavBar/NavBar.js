import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { client } from '../../index'

const GET_CURRENT_USER = gql`
  {
    me {
      email
    }
  }
`
const logOut = () => {
  localStorage.clear()
  client.resetStore()
}
const NavBar = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  if (data.me.email) {
    return (
      <div>
        <div>
          <p>{data.me.email}</p>
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
          <Link to='/login'>
            <button onClick={logOut}>Logout</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default NavBar
