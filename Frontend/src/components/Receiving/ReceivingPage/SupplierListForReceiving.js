import React from 'react'

const SupplierListForReceiving = ({
  items,
  activeSupplier,
  setActiveSupplier,
  suppliers,
  orderReceivedWithSuppliersData,
}) => {
  return suppliers.map((supplier) =>
    supplier.supplierName === 'Market Price' ? null : (
      <button
        key={supplier.supplierName}
        className={`flex flex-col transition duration-200 ease-in-out w-auto px-4 py-1 mb-1 border border-gray-900 rounded-t mx-1
        ${
          orderReceivedWithSuppliersData.supplierOrders.find(
            (e) => e.supplierId == supplier.id
          ).wasOrderReceived && 'bg-green-400'
        }
${activeSupplier === supplier ? 'bg-gray-600 text-gray-200' : 'bg-gray-400'}`}
        onClick={() => setActiveSupplier(supplier)}
      >
        <div className='flex flex-col'>
          <span>{supplier.supplierName}</span>
          <span className='text-sm'>
            {supplier.deliveryDay && `(${supplier.deliveryDay})`}
          </span>
        </div>
      </button>
    )
  )
}

export default SupplierListForReceiving
