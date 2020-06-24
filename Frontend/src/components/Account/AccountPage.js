import React from 'react'
import NavBar from '../NavBar/NavBar'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'

const AccountPage = ({}) => {
  return (
    <div className='flex flex-col h-screen'>
      <NavBar />
      <div className='flex flex-grow'>
        <SideBar />
        <Outlet />
      </div>
    </div>
  )
}

export default AccountPage
