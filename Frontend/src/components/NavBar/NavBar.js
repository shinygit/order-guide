import React from 'react'
import { Link } from 'react-router-dom'
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
  if (data && data.me && data.me.email) {
    return (
      <div className='flex justify-between items-center py-3 bg-blue-800'>
        <div className='flex flex-row items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-10 w-10 ml-5 text-gray-100 fill-current'
            viewBox='0 0 20 20'
          >
            <path d='M16 2h4v15a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V0h16v2zm0 2v13a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4h-2zM2 2v15a1 1 0 0 0 1 1h11.17a2.98 2.98 0 0 1-.17-1V2H2zm2 8h8v2H4v-2zm0 4h8v2H4v-2zM4 4h8v4H4V4z' />
          </svg>
          <span className='ml-1 text-xl text-gray-100 font-semibold invisible sm:visible'>
            Build-To Order Guides
          </span>
        </div>
        <ul className='flex mr-5 text-gray-100 font-semibold'>
          <li className='mr-6 p-1 border-b-2 border-yellow-200'>
            <Link to='/'>Home</Link>
          </li>
          <li className='mr-6 p-1'>
            <Link onClick={logOut} to='/login'>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    )
  } else return null
}

export default NavBar
// <p className='text-xl text-gray-100 font-semibold'>{data.me.email}</p>
