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
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

export default function MainRoutes() {
  const { data, loading, error } = useQuery(GET_ME)
  const navigate = useNavigate()
  const location = useLocation()
  if (loading) return null
  const { me = {} } = data

  let redirectedToUrl
  if (
    me === null &&
    location.pathname !== '/login' &&
    location.pathname !== '/register' &&
    location.pathname !== '/receiverlogin'
  ) {
    localStorage.clear()
    redirectedToUrl = <Navigate to='/login' />
  }
  if (
    me !== null &&
    (location.pathname == '/login' ||
      location.pathname == '/register' ||
      location.pathname == '/receiverlogin')
  ) {
    redirectedToUrl = <Navigate to='/' />
  }
  if (
    me !== null &&
    me.__typename === 'Receiver' &&
    location.pathname !== '/receiving'
  ) {
    redirectedToUrl = <Navigate to='/receiving' />
  }
  return (
    <>
      {redirectedToUrl}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/receiverlogin' element={<ReceiverLogin />} />
        <Route path='/suppliers' element={<MainSupplierView />} />
        <Route path='/manual' element={<Manual />} />
        <Route path='/receiving' element={<ReceivingPage />} />
        <Route path='/receivers' element={<ReceiversPage />} />
        <Route path='/' element={<App />} />
      </Routes>
    </>
  )
}
