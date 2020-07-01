import React from 'react'

const SupplierCard = ({ supplier, selectedCard, setSelectedCard }) => {
  return (
    <div className='max-w-md text-gray-900'>
      <div className='relative flex flex-col border-2 rounded p-2 bg-white border-gray-300 shadow hover:bg-gray-100 hover:shadow-lg hover:border-blue-300'>
        <div
          className='absolute top-0 right-0 m-1'
          onClick={() => setSelectedCard(supplier.id)}
        >
          <button className='border bg-gray-100 text-sm'>EDIT</button>
        </div>
        <div className='text-2xl font-semibold self-center'>
          {supplier.supplierName}
        </div>

        <div className='grid grid-cols-2'>
          <div className='flex flex-col'>
            <span className='text-gray-700 text-sm pr-2'>office phone</span>
            <span className='pl-4'>{supplier.officePhoneNumber}</span>
          </div>
          <div className='flex flex-col ml-5'>
            <span className='text-gray-700 text-sm -ml-4'>sales person</span>
            <span className=''>{supplier.salesPersonName}</span>
          </div>
        </div>
        <div className='grid grid-cols-2'>
          <div className='flex flex-col'></div>
          <div className='flex flex-col ml-5'>
            <span className='text-gray-700 text-sm -ml-4'>phone</span>
            <span className=''>{supplier.salesPersonPhoneNumber}</span>
          </div>
        </div>
        <div className='grid grid-cols-2'>
          <div className='flex flex-col'>
            <span className='text-gray-700 text-sm pr-2'>delivery day</span>
            <span className='pl-4'>{supplier.deliveryDay}</span>
          </div>
          <div className='flex flex-col ml-5'>
            <span className='text-gray-700 text-sm -ml-4'>email</span>
            <span className=''>{supplier.salesPersonEmail}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SupplierCard
