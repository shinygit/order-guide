import React from 'react'
import ChangeReceivedAmount from './changeReceivedAmount'
import ReceiverFlaggedToggle from './ReceiverFlaggedToggle'

const ListItemsForReceiving = ({
  items,
  activeSupplier,
  me,
  confirmIfReceivedSubmitted,
}) => {
  const itemsToDisplay = items.filter(
    (item) =>
      item.supplier === activeSupplier.supplierName &&
      item.orderAmount !== 0 &&
      item.orderAmount !== null
  )

  return itemsToDisplay.map((item, index) => {
    return (
      <div
        key={item.itemName}
        className={`${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}
      >
        <div className={`grid grid-cols-6`}>
          <div className='text-center border p-2 col-span-2 border-gray-800'>
            {item.itemName}
          </div>
          <div className='text-center border p-2 border-gray-800'>
            {item.orderAmount}
          </div>
          <div className='text-center border p-2 col-span-2 border-gray-800'>
            <ChangeReceivedAmount
              item={item}
              confirmIfReceivedSubmitted={confirmIfReceivedSubmitted}
            />
          </div>
          <div className='text-center border p-2 border-gray-800'>
            <ReceiverFlaggedToggle
              item={item}
              me={me}
              confirmIfReceivedSubmitted={confirmIfReceivedSubmitted}
            />
          </div>
        </div>
        {item.receivingNote && (
          <div className='border-r border-l border-b border-gray-800 mb-1'>
            Note: {item.receivingNote}
          </div>
        )}
        {item.receiverNote && (
          <div className='border-r border-l border-b border-gray-800 mb-1'>
            Your Note: {item.receiverNote}
          </div>
        )}
      </div>
    )
  })
}
export default ListItemsForReceiving
