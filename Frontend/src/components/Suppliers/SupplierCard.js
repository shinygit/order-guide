import React from 'react'

const SupplierCard = ({ supplier, selectedCard, setSelectedCard }) => {
  return (
    <div className='w-6/12 max-w-sm'>
      <div
        onClick={() => setSelectedCard(supplier.id)}
        className={`flex flex-col border-4 rounded p-1 m-2 ${
          selectedCard === supplier.id
            ? 'bg-gray-200 border-gray-600'
            : 'bg-white border-gray-300 hover:bg-gray-100 hover:shadow-lg'
        }`}
      >
        <div className='text-3xl '>{supplier.supplierName}</div>
        <div className=''>Office Phone: {supplier.officePhoneNumber}</div>
        <div className='text-sm'>Delivery Day: {supplier.deliveryDay}</div>
        <div className='text-xl flex flex-row-reverse'>
          Sales Person: {supplier.salesPersonName}
        </div>
        <div className='flex flex-row-reverse'>
          Phone: {supplier.salesPersonPhoneNumber}
        </div>
      </div>
    </div>
  )
}
export default SupplierCard
