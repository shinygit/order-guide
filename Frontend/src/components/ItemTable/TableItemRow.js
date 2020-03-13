import React from 'react'
import ChangeOrderAmount from './ChangeOrderAmount'
import TableItemRowExpanded from './TableItemRowExpanded'
import ClipboardDown from './icons/ClipboardDown'
import ClipboardUp from './icons/ClipboardUp'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const TableItemRow = ({
  item,
  handleToggleEdit,
  handleToggleShowExpandedItem
}) => {
  return (
    <>
      <tr>
        <td className='hidden md:table-cell'>
          <button onClick={() => handleToggleShowExpandedItem(item.id)}>
            {!item.isExpanded && <ClipboardDown />}
            {item.isExpanded && <ClipboardUp />}
          </button>
        </td>
        <td className='border border-gray-700 text-center px-1'>
          {item.itemName}
        </td>
        <td className='border border-gray-700 text-center'>{item.buildTo}</td>
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
