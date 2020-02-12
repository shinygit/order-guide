import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import App from '../../App'
import Login from '../User/Login'
import Register from '../User/Register'
import { Switch, Route, useHistory, Redirect } from 'react-router-dom'

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`
export default function IsLoggedIn() {
  const history = useHistory()
  const { data } = useQuery(IS_LOGGED_IN)
  if (!data.isLoggedIn && history.location.pathname !== '/login') {
    return <Redirect to='/login' />
  }
  return (
    <Switch>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/register'>
        <Register />
      </Route>
      <Route exact path='/'>
        <App />
      </Route>
    </Switch>
  )
}
