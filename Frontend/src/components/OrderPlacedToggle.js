import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { GET_SUPPLIERS_WITH_ORDER_STATUS } from '../Queries/supplier'
import { FILTER_QUERY } from '../Queries/filter'
import { GET_IS_ORDER_PLACED } from '../Queries/order'

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
  const { data: filterData } = useQuery(FILTER_QUERY)

  const { data: supplierData = {} } = useQuery(
    GET_SUPPLIERS_WITH_ORDER_STATUS,
    {
      variables: {
        orderId: orderId,
      },
    }
  )

  const { suppliers = [] } = supplierData
  const supplier = suppliers.find((supplier) => {
    if (supplier.supplierName === 'Market Price') return false
    if (supplier.supplierName === filterData.filter.filterName) return true
    return false
  })

  const [toggleOrderPlaced] = useMutation(TOGGLE_ORDER_PLACED, {
    update(cache, { data: { toggleOrderPlacedWithSupplierId } }) {
      const queryResults = cache.readQuery({
        query: GET_SUPPLIERS_WITH_ORDER_STATUS,
        variables: { orderId: orderId },
      })
      const { suppliers: queriedSuppliers } = queryResults
      const results = {
        suppliers: queriedSuppliers.map((queriedSupplier) =>
          queriedSupplier.id === supplier.id
            ? {
                ...queriedSupplier,
                wasOrderPlaced: toggleOrderPlacedWithSupplierId.wasOrderPlaced,
              }
            : queriedSupplier
        ),
      }
      cache.writeQuery({
        query: GET_SUPPLIERS_WITH_ORDER_STATUS,
        variables: { orderId: orderId },
        data: results,
      })
    },
  })

  const handleChange = () => {
    toggleOrderPlaced({
      variables: {
        supplierId: supplier.id,
        orderId: orderId,
      },
    })
  }
  if (supplier)
    return (
      <div
        onClick={handleChange}
        className={`transition duration-200 ease-in-out flex flex-col justify-center items-center border border-gray-700 px-3 ${
          supplier.wasOrderPlaced ? 'bg-green-300' : 'bg-orange-300'
        }`}
      >
        Order placed with {supplier?.supplierName}?
        <div>{supplier.wasOrderPlaced ? 'Yes' : 'No'}</div>
      </div>
    )
  return null
}

export default OrderPlaceToggle
