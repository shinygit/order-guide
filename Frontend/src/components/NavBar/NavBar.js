import React, { useContext } from 'react'
import { UserContext } from '../../App'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
    }
  }
`

const NavBar = () => {
  const { user, dispatchUser } = useContext(UserContext)
  return (
    <div>
      <Query query={GET_CURRENT_USER}>
        {({ data, loading }) => {
          const { viewer } = data
          if (loading || !viewer) {
            return <div>Loading...</div>
          }
          return (
            <div>
              <p>Currently logged in as: {viewer.name}</p>
            </div>
          )
        }}
      </Query>
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
