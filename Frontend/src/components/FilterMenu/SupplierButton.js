import React from 'react'
import { useQuery } from '@apollo/react-hooks'

const SupplierButton = ({
  handleShowSupplier,
  activeFilterbuttonClass,
  supplier,
  items,
}) => {
  const suppliersItems = items.filter(
    (item) => item.supplier === supplier.supplierName
  )
  const flagged = suppliersItems.some(
    (suppliersItem) => suppliersItem.flaggedByReceiver
  )
  return (
    <div
      key={supplier.supplierName}
      className='m-1 grid grid-cols-2'
      onClick={() => handleShowSupplier(supplier.supplierName)}
    >
      <button
        className={`col-span-2 transition duration-200 ease-in-out w-auto p-2 border border-gray-900 rounded-t
${
  activeFilterbuttonClass === `${supplier.supplierName}-filter-button`
    ? 'bg-gray-600 text-gray-200'
    : 'bg-gray-400'
}`}
      >
        {supplier.supplierName}
      </button>
      <button
        className={`rounded-bl border-l border-b border-gray-900 px-px ${
          supplier.wasOrderPlaced ? 'bg-green-300' : 'bg-orange-300'
        }`}
      >
        Ordered
      </button>
      <button
        className={`rounded-br border-r border-b border-l border-gray-900 px-px ${
          flagged
            ? 'bg-red-300'
            : supplier.wasOrderReceived
            ? 'bg-green-300'
            : 'bg-orange-300'
        }`}
      >
        Received
      </button>
    </div>
  )
}
export default SupplierButton
