import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_IS_ORDER_PLACED } from '../../Queries/order'
import { GET_SUPPLIERS } from '../../Queries/supplier'
import gql from 'graphql-tag'

const GET_SUPPLIERS_ORDERED = gql`
  query SuppliersOrdered($orderId: Int!) {
    suppliersOrdered(orderId: $orderId) {
      supplierId
      orderId
      wasOrderPlaced
    }
  }
`

const SupplierFilterButtons = ({
  orderId,
  handleShowSupplier,
  activeFilterbuttonClass,
}) => {
  const { loading: supplierLoading, data: supplierData = {} } = useQuery(
    GET_SUPPLIERS
  )
  const { suppliers = [] } = supplierData

  const {
    loading: suppliersOrderedLoading,
    data: { suppliersOrdered } = [],
  } = useQuery(GET_SUPPLIERS_ORDERED, {
    skip: !orderId,
    variables: {
      orderId: parseInt(orderId),
    },
  })

  const isOrdered = (supplier) => {
    const wasPlaced = suppliersOrdered.find((x) => x.supplierId == supplier.id)
    if (wasPlaced) return wasPlaced.wasOrderPlaced
    return false
  }

  if (supplierLoading || suppliersOrderedLoading) return null
  return suppliers.map((supplier) => {
    if (supplier.supplierName !== 'Market Price') {
      return (
        <div
          key={supplier.supplierName}
          className={`m-1 rounded ${
            isOrdered(supplier) ? 'bg-green-300' : 'bg-orange-300'
          }`}
        >
          <button
            className={`transition duration-200 ease-in-out w-auto p-4 mb-1 border border-gray-900 rounded-t
    ${
      activeFilterbuttonClass === `${supplier.supplierName}-filter-button`
        ? 'bg-gray-600 text-gray-200'
        : 'bg-gray-400'
    }`}
            onClick={() => handleShowSupplier(supplier.supplierName)}
          >
            {supplier.supplierName}
          </button>
        </div>
      )
    }
  })
}
export default SupplierFilterButtons
