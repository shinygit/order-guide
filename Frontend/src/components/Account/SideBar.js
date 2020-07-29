import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const chevron = (
  <svg
    className='stroke-current text-gray-500 h-6'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 20 20'
  >
    <path
      fill='#FFF'
      d='M9.163 4.516c.418.408 4.502 4.695 4.502 4.695.223.219.335.504.335.789s-.112.57-.335.787c0 0-4.084 4.289-4.502 4.695-.418.408-1.17.436-1.615 0-.446-.434-.481-1.041 0-1.574L11.295 10 7.548 6.092c-.481-.533-.446-1.141 0-1.576.445-.436 1.197-.409 1.615 0z'
    />
  </svg>
)

const SideBar = ({}) => {
  const location = useLocation()
  return (
    <div className='bg-white border-r-2 border-gray-300 p-5 w-48'>
      <Link to='categories'>
        <div className='flex justify-between items-center border-b-2 border-gray-300 text-gray-900 py-3 pl-3'>
          <span>Categories</span>
          {location.pathname === '/account/categories' ? chevron : null}
        </div>
      </Link>
      <Link to='receivers'>
        <div className='flex justify-between items-center border-b-2 border-gray-300 text-gray-900 py-3 pl-3'>
          <span>Receivers</span>
          {location.pathname === '/account/receivers' ? chevron : null}
        </div>
      </Link>
      <Link to='notifications'>
        <div className='flex justify-between items-center border-b-2 border-gray-300 text-gray-900 py-3 pl-3'>
          <span>Notifications</span>
          {location.pathname === '/account/notifications' ? chevron : null}
        </div>
      </Link>
    </div>
  )
}

export default SideBar
