import React from 'react'
import App from '../../App'
import Login from '../User/Login'
import Register from '../User/Register'
import { Switch, Route, useHistory, Redirect } from 'react-router-dom'

export default function IsLoggedIn() {
  const history = useHistory()
  const token = localStorage.getItem('token')
  if (
    !token &&
    history.location.pathname !== '/login' &&
    history.location.pathname !== '/register'
  ) {
    return <Redirect to='/login' />
  }
  if (token && history.location.pathname !== '/') {
    return <Redirect to='/' />
  }
  return (
    <Switch>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/'>
        <App />
      </Route>
    </Switch>
  )
}
