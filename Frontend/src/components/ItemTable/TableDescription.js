import React, { useState } from 'react'
import SupplierReceivingNotes from './SupplierReceivingNotes'

const TableDescription = ({ filterName, filterType, suppliers, orderId }) => {
  const [
    supplierReceivingNotesInputObject,
    setSupplierReceivingNotesInputObject,
  ] = useState({})

  if (filterName === 'SHORTED' && filterType === 'SHORTED')
    return (
      <div className='flex flex-col p-4 text-lg bg-yellow-200 border-t border-l border-r border-gray-700'>
        Additional Notes:
        {suppliers.map((supplier) => {
          if (
            filterName === 'SHORTED' &&
            filterType === 'SHORTED' &&
            supplier.wasOrderReceived &&
            supplier.additionalNotes
          )
            return (
              <div className='m-1 ml-4'>
                <span>{`${supplier.supplierName}: `}</span>
                <span>{supplier.additionalNotes}</span>
              </div>
            )
        })}
      </div>
    )
  if (filterType === 'supplier') {
    const supplier = suppliers.find((e) => e.supplierName === filterName)
    if (supplier.supplierName === 'Market Price') return null
    return (
      <div className='flex flex-col w-3/4 p-4 text-lg bg-yellow-200 border-t border-l border-r border-gray-700 sm:w-1/2 md:w-2/3'>
        <SupplierReceivingNotes
          supplier={supplier}
          orderId={orderId}
          supplierReceivingNotesInputObject={supplierReceivingNotesInputObject}
          setSupplierReceivingNotesInputObject={
            setSupplierReceivingNotesInputObject
          }
        />
      </div>
    )
  }
  if (filterName === 'DOUBLECHECK' && filterType === 'DOUBLECHECK')
    return (
      <div className='flex flex-col p-4 text-lg bg-yellow-200 border-t border-l border-r border-gray-700'>
        Items not ordered this week but have been ordered at least 3 of the last
        4 weeks.
      </div>
    )

  return null
}
export default TableDescription
