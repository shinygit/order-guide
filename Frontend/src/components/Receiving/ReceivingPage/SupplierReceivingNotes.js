import React from 'react'

const SupplierReceivingNote = ({
  activeSupplier,
  orderReceivedWithSuppliersData,
}) => {
  const supplierReceivingNotes = orderReceivedWithSuppliersData.supplierOrders.find(
    (e) => {
      return e.supplierId == activeSupplier.id
    }
  )?.supplierReceivingNotes
  if (!supplierReceivingNotes) return null
  return (
    <div className='w-8/12 p-1 mx-auto bg-gray-200 border border-gray-900 rounded'>
      <div className='pb-2 pl-5'>{`${activeSupplier.supplierName} receiving notes:`}</div>
      <div className='ml-10 whitespace-pre-wrap'>{supplierReceivingNotes}</div>
    </div>
  )
}

export default SupplierReceivingNote
