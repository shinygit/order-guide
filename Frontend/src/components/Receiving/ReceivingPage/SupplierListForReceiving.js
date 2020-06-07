import React from 'react'

const SupplierListForReceiving = ({
  items,
  activeSupplier,
  setActiveSupplier,
  suppliers,
}) => {
  return suppliers.map((supplier) =>
    supplier.supplierName === 'Market Price' ? null : (
      <button
        key={supplier.supplierName}
        className={`transition duration-200 ease-in-out w-auto px-4 py-1 mb-1 border border-gray-900 rounded-t mx-1
${activeSupplier === supplier ? 'bg-gray-600 text-gray-200' : 'bg-gray-400'}`}
        onClick={() => setActiveSupplier(supplier)}
      >
        {supplier.supplierName}
      </button>
    )
  )
}

export default SupplierListForReceiving
