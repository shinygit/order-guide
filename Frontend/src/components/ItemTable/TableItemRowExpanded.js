import React from 'react'

const TableItemRowExpanded = ({ item, handleToggleEdit, index }) => {
  return (
    <>
      <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
        <td className='bg-yellow-100'>
          <button onClick={() => handleToggleEdit(item.id)}>Edit</button>
        </td>
        <th colSpan='2' className={tableCell}>
          Price
        </th>
        <td className={tableCell}>
          {(item.unitPriceInPennies / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </td>
        <th colSpan='2' className={tableCell}>
          Market Price?
        </th>
        <td className={tableCell}>{(item.isMarketPrice && 'Yes') || 'No'}</td>
      </tr>
      <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
        <td className='bg-yellow-100' />
        <th colSpan='2' className={tableCell}>
          Quantity on hand
        </th>
        <td className={tableCell}>{item.quantityOnHand}</td>
      </tr>
      <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
        <td className='bg-yellow-100' />
        <th colSpan='2' className={tableCell}>
          Quantity Received
        </th>
        <td className={tableCell}>{item.quantityReceived}</td>
      </tr>
      <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
        <td className='bg-yellow-100' />
        <th colSpan='2' className={tableCell}>
          Item Note
        </th>
        <td colSpan='5' className={tableCell}>
          {item.itemNote}
        </td>
      </tr>
      <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
        <td className='bg-yellow-100' />
        <th colSpan='2' className={tableCell}>
          Special Note
        </th>
        <td colSpan='5' className={tableCell}>
          {item.specialNote}
        </td>
      </tr>
      <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
        <td className='bg-yellow-100' />
        <th colSpan='2' className={tableCell}>
          Receiving Note
        </th>
        <td colSpan='5' className={tableCell}>
          {item.receivingNote}
        </td>
      </tr>
      <tr>
        <td className='h-3' />
      </tr>
    </>
  )
}
export default TableItemRowExpanded

const tableCell = 'border border-gray-700 text-center'
