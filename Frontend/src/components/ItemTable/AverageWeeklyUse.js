import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const ADDITIONAL_ITEM_INFO = gql`
  query Item($id: ID!) {
    item(id: $id) {
      id
      averageWeeklyUse
    }
  }
`
const AverageWeeklyUse = ({ itemId }) => {
  const { loading, data, error } = useQuery(ADDITIONAL_ITEM_INFO, {
    variables: { id: itemId },
  })
  if (loading) return 'Loading...'
  if (error) return 'Error...'
  return data.item.averageWeeklyUse.toFixed(2)
  return null
}

export default AverageWeeklyUse
