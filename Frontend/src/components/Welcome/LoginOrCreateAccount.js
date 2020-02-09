import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import App from '../../App'

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`
export default function IsLoggedIn () {
  const { data } = useQuery(IS_LOGGED_IN)
  if (data) console.log('hey you are logged in')
  if (!data) console.log('you are not logged in')
  return data.isLoggedIn ? <App /> : <App />
}
