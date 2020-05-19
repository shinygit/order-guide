import React, { useState } from 'react'
import ChangeOrderAmount from './ChangeOrderAmount'
import TableItemRowExpanded from './TableItemRowExpanded'
import ClipboardDown from './icons/ClipboardDown'
import ClipboardUp from './icons/ClipboardUp'
import MarketPriceSupplierSelector from './MarketPriceSupplierSelector'
import { ORDER_DATES } from '../../Queries/order'
import { useQuery } from '@apollo/react-hooks'

const TableItemRow = ({
  item,
  handleToggleEdit,
  handleToggleShowExpandedItem,
  index,
  orderDates,
}) => {
  return (
    <>
      <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
        <td className='hidden md:table-cell bg-yellow-100'>
          <button onClick={() => handleToggleShowExpandedItem(item.id)}>
            {item.isExpanded ? (
              <ClipboardUp />
            ) : (
              <ClipboardDown bold={item.specialNote} />
            )}
          </button>
        </td>
        <td className='border border-gray-700 text-center px-1'>
          {item.itemName}
        </td>
        <td className='hidden md:table-cell border border-gray-700 text-center'>
          {item.unitSize}
        </td>
        <td className='hidden lg:table-cell border border-gray-700 text-center'>
          {item.productNumber}
        </td>
        <td className='border border-gray-700 text-center'>{item.buildTo}</td>
        <td className='hidden md:table-cell border border-gray-700 text-center'>
          {item.previousOrders[1]}
        </td>
        <td className='border border-gray-700 text-center'>
          {item.previousOrders[0]}
        </td>
        <td className='border border-gray-700 text-center'>
          <ChangeOrderAmount id={item.id} orderDates={orderDates} />
        </td>
        <td className='hidden md:table-cell border border-gray-700 text-center px-1'>
          {item.isMarketPrice && !orderDates?.orders[0].isLocked ? (
            <MarketPriceSupplierSelector item={item} />
          ) : (
            item.supplier
          )}
        </td>
        <td className='hidden md:table-cell border border-gray-700 text-center px-1'>
          {item.location}
        </td>
      </tr>
      {!item.isExpanded && item.specialNote ? (
        <>
          <tr>
            <td />
            <td
              className={`border border-gray-700 ${
                index % 2 === 0 ? 'bg-gray-200' : 'bg-white'
              }`}
              colSpan='9'
            >
              Special Note: {item.specialNote}
            </td>
          </tr>
          <tr className='h-1' />
        </>
      ) : null}
      {item.isExpanded ? (
        <TableItemRowExpanded
          index={index}
          item={item}
          handleToggleEdit={handleToggleEdit}
        />
      ) : null}
    </>
  )
}
export default React.memo(TableItemRow)
