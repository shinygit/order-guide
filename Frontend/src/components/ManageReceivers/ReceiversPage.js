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
      <AddReceiver />
      <ListReceivers receivers={receivers} />
    </div>
  )
}
export default ReceiversPage
