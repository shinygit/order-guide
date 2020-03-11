import React, { useState } from 'react'
import ChangeOrderAmount from './ChangeOrderAmount'
import TableItemRowExpanded from './TableItemRowExpanded'
import ClipboardDown from './icons/ClipboardDown'
import ClipboardUp from './icons/ClipboardUp'

const areEqual = (prevProps, nextProps) => {
  return prevProps.item === nextProps.item
}
const TableItemRow = React.memo(({ item, handleToggleEdit }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <tr>
        <td className='hidden md:table-cell'>
          <button onClick={() => setExpanded(!expanded)}>
            {!expanded && <ClipboardDown />}
            {expanded && <ClipboardUp />}
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
      {expanded && (
        <TableItemRowExpanded
          item={item}
          handleToggleEdit={handleToggleEdit}
          setExpanded={setExpanded}
        />
      )}
    </>
  )
}, areEqual)
export default TableItemRow
