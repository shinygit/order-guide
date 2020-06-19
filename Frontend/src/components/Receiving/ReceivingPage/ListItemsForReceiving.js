import React from 'react'
import ChangeReceivedAmount from './changeReceivedAmount'
import ReceiverFlaggedToggle from './ReceiverFlaggedToggle'

const ListItemsForReceiving = ({
  items,
  activeSupplier,
  me,
  confirmIfReceivedSubmitted,
}) => {
  const filteredItems = items.filter(
    (item) =>
      item.supplier === activeSupplier.supplierName &&
      item.orderAmount !== 0 &&
      item.orderAmount !== null
  )
  const itemsToDisplay = filteredItems.slice().sort(function (a, b) {
    if (a.itemName > b.itemName) return 1
    if (a.itemName < b.itemName) return -1
    return 0
  })

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
            Receiving Note: {item.receivingNote}
          </div>
        )}
        {item.receiverNote && (
          <div className='border-r border-l border-b border-gray-800 mb-1'>
            Receiver Note: {item.receiverNote}
          </div>
        )}
      </div>
    )
  })
}
export default ListItemsForReceiving
