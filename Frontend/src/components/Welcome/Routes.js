import React from 'react'
import App from '../../App'
import Login from '../User/Login'
import Register from '../User/Register'
import MainSupplierView from '../Suppliers/MainSupplierView'
import Manual from '../Manual'
import ReceiverLogin from '../Receiving/ReceiverLogin'
import ReceivingPage from '../Receiving/ReceivingPage/ReceivingPage'
import ReceiversPage from '../ManageReceivers/ReceiversPage'
import { GET_ME } from '../../Queries/user'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

export default function Routes() {
  const { data, loading, error } = useQuery(GET_ME)
  const history = useHistory()
  if (loading) return null
  const { me = {} } = data

  if (
    me === null &&
    history.location.pathname !== '/login' &&
    history.location.pathname !== '/register' &&
    history.location.pathname !== '/receiverlogin'
  ) {
    localStorage.clear()
    history.push('/login')
  }
  if (
    me !== null &&
    (history.location.pathname == '/login' ||
      history.location.pathname == '/register' ||
      history.location.pathname == '/receiverlogin')
  ) {
    history.push('/')
  }
  if (
    me !== null &&
    me.__typename === 'Receiver' &&
    history.location.pathname !== '/receiving'
  ) {
    history.push('/receiving')
  }
  return (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/receiverlogin' component={ReceiverLogin} />
      <Route path='/suppliers' component={MainSupplierView} />
      <Route path='/manual' component={Manual} />
      <Route path='/receiving' component={ReceivingPage} />
      <Route path='/receivers' component={ReceiversPage} />
      <Route path='/' component={App} />
    </Switch>
  )
}
