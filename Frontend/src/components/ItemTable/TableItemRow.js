import React from 'react'
import ChangeOrderAmount from './ChangeOrderAmount'

const areEqual = (prevProps, nextProps) => {
  return prevProps.item === nextProps.item
}
const TableItemRow = React.memo(({ item, handleEdit }) => {
  return (
    <tr>
      <td className='hidden md:block'>
        <button onClick={() => handleEdit(item.id)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
          >
            <path d='M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z' />
          </svg>
        </button>
      </td>
      <td className='border border-gray-700 text-center px-1'>
        {item.itemName}
      </td>
      <td className='border border-gray-700 text-center'>{item.buildTo}</td>
      <td className='hidden md:block border border-gray-700 text-center'>
        {item.previousOrders[1]}
      </td>
      <td className='border border-gray-700 text-center'>
        {item.previousOrders[0]}
      </td>
      <td className='border border-gray-700 text-center'>
        <ChangeOrderAmount id={item.id} orderAmount={item.orderAmount} />
      </td>
      <td className='hidden md:block border border-gray-700 text-center px-1'>
        {item.supplier}
      </td>
      <td className='hidden md:block border border-gray-700 text-center px-1'>
        {item.location}
      </td>
    </tr>
  )
}, areEqual)
export default TableItemRow
