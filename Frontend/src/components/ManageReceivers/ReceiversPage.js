import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Loading from '../Loading'
import NavBar from '../NavBar/NavBar'
import ListReceivers from './ListReceivers'
import AddReceiver from './AddReceiver'
import { GET_RECEIVERS } from '../../Queries/receiver'

const ReceiversPage = () => {
  const { data, loading, errors } = useQuery(GET_RECEIVERS)
  if (loading) return <Loading />
  const { receivers } = data
  return (
    <div>
      <NavBar />
      <div className='flex p-3'>
        <div className='mr-4'>
          <div className='flex justify-between'>
            <span>Name</span>
            <span>Login</span>
            <span></span>
          </div>
          <ListReceivers receivers={receivers} />
        </div>
        <AddReceiver />
      </div>
    </div>
  )
}
export default ReceiversPage
