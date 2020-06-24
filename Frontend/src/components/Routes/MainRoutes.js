import React from 'react'
import App from '../../App'
import Login from '../User/Login'
import Register from '../User/Register'
import MainSupplierView from '../Suppliers/MainSupplierView'
import Manual from '../Manual'
import ReceiverLogin from '../Receiving/ReceiverLogin'
import ReceivingPage from '../Receiving/ReceivingPage/ReceivingPage'
import ReceiversPage from '../Account/ManageReceivers/ReceiversPage'
import NotificationPage from '../Account/ManageNotifications/NotificationPage'
import { GET_ME } from '../../Queries/user'
import { Routes, Route } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import useRouteLogic from './useRouteLogic'
import AccountPage from '../Account/AccountPage'

export default function MainRoutes() {
  const { data = {}, loading } = useQuery(GET_ME)
  const { me = {} } = data
  const chosenRoute = useRouteLogic(me)
  if (loading) return null

  return (
    <>
      {chosenRoute}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/receiverlogin' element={<ReceiverLogin />} />
        <Route path='/suppliers' element={<MainSupplierView />} />
        <Route path='/manual' element={<Manual />} />
        <Route path='/receiving' element={<ReceivingPage />} />
        <Route path='/account' element={<AccountPage />}>
          <Route path='/receivers' element={<ReceiversPage />} />
          <Route path='/notifications' element={<NotificationPage />} />
        </Route>
        <Route path='/' element={<App />} />
      </Routes>
    </>
  )
}
