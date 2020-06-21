import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const GET_NOTIFICATION_METHODS = gql`
  query {
    notificationMethods {
      id
      phoneNumber
      email
      confirmed
    }
  }
`

const NotificationPage = ({}) => {
  const { data } = useQuery(GET_NOTIFICATION_METHODS)
  console.log(data)
}

export default NotificationPage
