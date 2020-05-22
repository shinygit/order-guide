import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_IS_ORDER_PLACED } from '../../Queries/order'

const SupplierButton = ({
  orderId,
  handleShowSupplier,
  activeFilterbuttonClass,
  supplier,
}) => {
  const {
    loading: orderPlacedLoading,
    data: { supplierOrder: { wasOrderPlaced } = {} } = {},
  } = useQuery(GET_IS_ORDER_PLACED, {
    skip: !supplier,
    variables: {
      supplierId: supplier?.id,
      orderId: orderId,
    },
  })

  return (
    <div
      key={supplier.supplierName}
      className={`m-1 rounded ${
        wasOrderPlaced ? 'bg-green-300' : 'bg-orange-300'
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
export default SupplierButton
