import React from 'react'
import ChangeOrderAmount from './ChangeOrderAmount'
import TableItemRowExpanded from './TableItemRowExpanded'
import ClipboardDown from './icons/ClipboardDown'
import ClipboardUp from './icons/ClipboardUp'

const TableItemRow = ({
  item,
  handleToggleEdit,
  handleToggleShowExpandedItem,
}) => {
  return (
    <>
      <tr>
        <td className='hidden md:table-cell'>
          <button onClick={() => handleToggleShowExpandedItem(item.id)}>
            {!item.isExpanded && <ClipboardDown bold={item.specialNote} />}
            {item.isExpanded && <ClipboardUp />}
          </button>
        </td>
        <td className='border border-gray-700 text-center px-1'>
          {item.itemName}
        </td>
        <td className='hidden lg:table-cell border border-gray-700 text-center'>
          {item.productNumber}
        </td>
        <td className='border border-gray-700 text-center'>{item.buildTo}</td>
        <td className='hidden md:table-cell border border-gray-700 text-center'>
          {item.unitSize}
        </td>
        <td className='hidden md:table-cell border border-gray-700 text-center'>
          {item.previousOrders[1]}
        </td>
        <td className='border border-gray-700 text-center'>
          {item.previousOrders[0]}
        </td>
        <td className='border border-gray-700 text-center'>
          <ChangeOrderAmount id={item.id} orderAmount={item.orderAmount} />
        </td>
        <td className='hidden md:table-cell border border-gray-700 text-center px-1'>
          {item.supplier}
        </td>
        <td className='hidden md:table-cell border border-gray-700 text-center px-1'>
          {item.location}
        </td>
      </tr>
      {item.isExpanded && (
        <TableItemRowExpanded item={item} handleToggleEdit={handleToggleEdit} />
      )}
    </>
  )
}
export default TableItemRow
