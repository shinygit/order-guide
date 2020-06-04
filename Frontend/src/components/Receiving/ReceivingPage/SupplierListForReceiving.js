import React from 'react'

const SupplierListForReceiving = ({
  items,
  activeSupplier,
  setActiveSupplier,
}) => {
  const suppliers = [...new Set(items.map((item) => item.supplier))]
  if (!suppliers) return null

  return suppliers.map((supplier) => (
    <button
      key={supplier}
      className={`transition duration-200 ease-in-out w-auto px-4 py-1 mb-1 border border-gray-900 rounded-t mx-1
${activeSupplier === supplier ? 'bg-gray-600 text-gray-200' : 'bg-gray-400'}`}
      onClick={() => setActiveSupplier(supplier)}
    >
      {supplier}
    </button>
  ))
}

export default SupplierListForReceiving
