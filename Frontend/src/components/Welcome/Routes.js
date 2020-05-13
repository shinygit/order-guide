import React from 'react'
import App from '../../App'
import Login from '../User/Login'
import Register from '../User/Register'
import MainSupplierView from '../Suppliers/MainSupplierView'
import { Switch, Route, useHistory, Redirect } from 'react-router-dom'

export default function Routes() {
  const history = useHistory()
  const token = localStorage.getItem('token')
  if (
    !token &&
    history.location.pathname !== '/login' &&
    history.location.pathname !== '/register'
  ) {
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
      <Route path='/suppliers'>
        <MainSupplierView />
      </Route>
      <Route path='/'>
        <App />
      </Route>
    </Switch>
  )
}
