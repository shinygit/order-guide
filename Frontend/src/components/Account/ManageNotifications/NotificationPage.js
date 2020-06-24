import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import ListNotificationMethods from './ListNotificationMethods'
import AddNotificationMethod from './AddNotificationMethod'
import Loading from '../../Loading'
import { GET_NOTIFICATION_METHODS } from '../../../Queries/notificationMethod'

const NotificationPage = ({}) => {
  const { data, loading } = useQuery(GET_NOTIFICATION_METHODS)
  if (loading) return <Loading />
  const { notificationMethods } = data
  return (
    <div className=''>
      <div className='flex flex-col p-3'>
        <div className='flex flex-col lg:flex-row shadow-xl'>
          <AddNotificationMethod />
          <ListNotificationMethods notificationMethods={notificationMethods} />
        </div>
        <div className='text-gray-500 max-w-md'>
          If adding a phone number to receive texts use your carriers MMS
          gateway.
          <br />
          <a href='https://en.wikipedia.org/wiki/SMS_gateway' target='_blank'>
            https://en.wikipedia.org/wiki/SMS_gateway
          </a>
        </div>
      </div>
    </div>
  )
}

export default NotificationPage
