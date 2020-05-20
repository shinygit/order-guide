import React from 'react'

const SupplierCard = ({ supplier, selectedCard, setSelectedCard }) => {
  return (
    <div className='w-6/12 max-w-sm text-gray-900'>
      <div
        onClick={() => setSelectedCard(supplier.id)}
        className={`flex flex-col border-2 rounded p-2 m-2 ${
          selectedCard === supplier.id
            ? 'bg-gray-200 border-blue-700'
            : 'bg-white border-gray-300 shadow hover:bg-gray-100 hover:shadow-lg hover:border-blue-300'
        }`}
      >
        <div className='text-2xl font-semibold self-center'>
          {supplier.supplierName}
        </div>

        <div className='grid grid-cols-2'>
          <div className='flex flex-col'>
            <span className='text-gray-700 text-sm pr-2'>office phone:</span>
            <span className='pl-4'>{supplier.officePhoneNumber}</span>
          </div>
          <div className='flex flex-col ml-10'>
            <span className='text-gray-700 text-sm -ml-4'>sales person:</span>
            <span className=''>{supplier.salesPersonName}</span>
          </div>
        </div>
        <div className='grid grid-cols-2'>
          <div className='flex flex-col'>
            <span className='text-gray-700 text-sm pr-2'>delivery day:</span>
            <span className='pl-4'>{supplier.deliveryDay}</span>
          </div>
          <div className='flex flex-col ml-10'>
            <span className='text-gray-700 text-sm -ml-4'>phone:</span>
            <span className=''>{supplier.salesPersonPhoneNumber}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SupplierCard
