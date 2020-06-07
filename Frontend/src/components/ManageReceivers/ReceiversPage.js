import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const GET_RECEIVERS = gql`
  query receivers {
    receivers {
      id
      login
      receiverName
    }
  }
`
const ReceiversPage = () => {
  const { data, loading, errors } = useQuery(GET_RECEIVERS)
  console.log(data)
}
