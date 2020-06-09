import React from 'react'
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom'

export default function useRouteLogic(me) {
  const navigate = useNavigate()
  const location = useLocation()
  if (
    me === null &&
    location.pathname !== '/login' &&
    location.pathname !== '/register' &&
    location.pathname !== '/receiverlogin'
  ) {
    localStorage.clear()
    return <Navigate to='/login' />
  }
  if (
    me !== null &&
    (location.pathname == '/login' ||
      location.pathname == '/register' ||
      location.pathname == '/receiverlogin')
  ) {
    return <Navigate to='/' />
  }
  if (
    me !== null &&
    me.__typename === 'Receiver' &&
    location.pathname !== '/receiving'
  ) {
    return <Navigate to='/receiving' />
  }
}
