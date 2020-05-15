import React from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { GET_SUPPLIERS } from '../Queries/supplier'
import { FILTER_QUERY } from '../Queries/filter'
import { GET_LATEST_ORDER } from '../Queries/item'
const GET_IS_ORDER_PLACED = gql`
  query IsOrderPlacedWithSupplierId($supplierId: ID!, $orderId: ID!) {
    isOrderPlacedWithSupplierId(supplierId: $supplierId, orderId: $orderId)
  }
`
const TOGGLE_ORDER_PLACED = gql`
  mutation ToggleOrderPlacedWithSupplierId($supplierId: ID!, $orderId: ID!) {
    toggleOrderPlacedWithSupplierId(supplierId: $supplierId, orderId: $orderId)
  }
`

const OrderPlaceToggle = () => {
  const client = useApolloClient()
  const { loading: supplierLoading, data: supplierData } = useQuery(
    GET_SUPPLIERS
  )
  const { loading: filterLoading, data: filterData } = useQuery(FILTER_QUERY)

  const { suppliers } = supplierData
  const supplier = suppliers.find(
    (supplier) => supplier.supplierName === filterData.filter.filterName
  )
  const {
    orders: [currentOrder],
  } = client.readQuery({
    query: GET_LATEST_ORDER,
    variables: {
      orderDepth: 1,
    },
  })

  const { loading: orderPlacedLoading, data: orderPlacedData } = useQuery(
    GET_IS_ORDER_PLACED,
    {
      variables: {
        supplierId: supplier.id,
        orderId: currentOrder.id,
      },
    }
  )
  console.log(orderPlacedData?.isOrderPlacedWithSupplierId)
  const [toggleOrderPlaced, { data: toggleOrderPlacedData }] = useMutation(
    TOGGLE_ORDER_PLACED
  )
  const handleChange = () => {
    toggleOrderPlaced({
      variables: {
        supplierId: supplier.id,
        orderId: currentOrder.id,
      },
    })
  }
  if (!orderPlacedLoading)
    return (
      <div>
        {supplier.supplierName}
        <input
          type='checkbox'
          checked={orderPlacedData.isOrderPlacedWithSupplierId}
          onChange={handleChange}
        />
      </div>
    )
  return null
}

export default OrderPlaceToggle
