import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const ADDITIONAL_ITEM_INFO = gql`
  query Item($id: ID!) {
    item(id: $id) {
      id
      lastOrder {
        orderDate
        supplierName
      }
    }
  }
`
const LastOrderedSupplier = ({ itemId }) => {
  const { loading, data } = useQuery(ADDITIONAL_ITEM_INFO, {
    variables: { id: itemId },
  })
  if (loading) return 'Loading...'
  return !loading && data.item.lastOrder && data.item.lastOrder.supplierName
}

export default LastOrderedSupplier
