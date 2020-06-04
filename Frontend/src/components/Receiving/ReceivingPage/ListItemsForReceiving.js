import React from 'react'
import ChangeReceivedAmount from './changeReceivedAmount'
import ReceiverFlaggedToggle from './ToggleReceiverFlagged'

const ListItemsForReceiving = ({ items, activeSupplier, me }) => {
  return items.map((item) => {
    if (
      item.supplier === activeSupplier &&
      item.orderAmount !== 0 &&
      item.orderAmount !== null
    ) {
      return (
        <div key={item.itemName}>
          <div className='grid grid-cols-6'>
            <div className='text-center border p-2 col-span-2 border-gray-800'>
              {item.itemName}
            </div>
            <div className='text-center border p-2 border-gray-800'>
              {item.orderAmount}
            </div>
            <div className='text-center border p-2 col-span-2 border-gray-800'>
              <ChangeReceivedAmount item={item} />
            </div>
            <div className='text-center border p-2 border-gray-800'>
              <ReceiverFlaggedToggle item={item} me={me} />
            </div>
          </div>
          {item.receivingNote && (
            <div className='border-r border-l border-b border-gray-800 mb-1'>
              Note: {item.receivingNote}
            </div>
          )}
        </div>
      )
    }
  })
}
export default ListItemsForReceiving
