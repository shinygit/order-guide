import React from 'react'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { GET_SUPPLIERS } from '../Queries/supplier'
import { FILTER_QUERY } from '../Queries/filter'
import { ORDER_DATES } from '../Queries/order'
const GET_IS_ORDER_PLACED = gql`
  query SupplierOrder($supplierId: ID!, $orderId: ID!) {
    supplierOrder(supplierId: $supplierId, orderId: $orderId) {
      wasOrderPlaced
      orderId
      supplierId
    }
  }
`
const TOGGLE_ORDER_PLACED = gql`
  mutation ToggleOrderPlacedWithSupplierId($supplierId: ID!, $orderId: ID!) {
    toggleOrderPlacedWithSupplierId(
      supplierId: $supplierId
      orderId: $orderId
    ) {
      wasOrderPlaced
      orderId
      supplierId
    }
  }
`

const OrderPlaceToggle = ({ orderId }) => {
  const { loading: filterLoading, data: filterData } = useQuery(FILTER_QUERY)

  /*   const { loading: loadingLatestOrder, data: latestOrderData } = useQuery(
    ORDER_DATES,
    {
      variables: {
        orderDepth: 3,
      },
    }
  ) */
  const { loading: supplierLoading, data: supplierData = {} } = useQuery(
    GET_SUPPLIERS
  )
  const { suppliers = [] } = supplierData
  const supplier = suppliers.find((supplier) => {
    if (supplier.supplierName === 'Market Price') return false
    if (supplier.supplierName === filterData.filter.filterName) return true
  })
  const {
    loading: orderPlacedLoading,
    data: { supplierOrder: { wasOrderPlaced } = {} } = {},
  } = useQuery(GET_IS_ORDER_PLACED, {
    skip: !supplierData || !supplier,
    variables: {
      supplierId: supplier?.id,
      orderId: latestOrderData?.orders[0].id,
    },
  })
  const [toggleOrderPlaced, { data: toggleOrderPlacedData }] = useMutation(
    TOGGLE_ORDER_PLACED
  )

  const handleChange = () => {
    toggleOrderPlaced({
      variables: {
        supplierId: supplier.id,
        orderId: latestOrderData?.orders[0].id,
      },
    })
  }
  if (supplier)
    return (
      <div
        onClick={handleChange}
        className={`transition duration-200 ease-in-out flex flex-col justify-center items-center border-4 border border-gray-700 px-3 ${
          wasOrderPlaced ? 'bg-green-400' : 'bg-orange-300'
        }`}
      >
        Order placed with {supplier?.supplierName}?
        <div>{wasOrderPlaced ? 'Yes' : 'No'}</div>
      </div>
    )
  return null
}

export default OrderPlaceToggle