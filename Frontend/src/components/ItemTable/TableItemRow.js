import React, { useState, useCallback } from 'react'
import ChangeOrderAmount from './ChangeOrderAmount'
import TableItemRowExpanded from './TableItemRowExpanded'
import ClipboardDown from './icons/ClipboardDown'
import ClipboardUp from './icons/ClipboardUp'
import MarketPriceSupplierSelector from './MarketPriceSupplierSelector'
import { ORDER_DATES } from '../../Queries/order'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import useLongPress from '../../hooks/useLongPress'
import EditItemWindow from './EditItemWindow'
import { Portal } from 'react-portal'
import gql from 'graphql-tag'

const GET_ITEM = gql`
  query Item($id: ID!) {
    item(id: $id) {
      id
      itemName
      orderAmount
      supplier
      location
      buildTo
      quantityOnHand
      quantityReceived
      orderAmount
      unitPriceInPennies
      isMarketPrice
      productNumber
      unitSize
      itemNote
      specialNote
      receivingNote
      previousOrders(count: 2)
      showEditForm @client
      isExpanded @client
    }
  }
`

const TableItemRow = ({
  id,
  handleToggleEdit,
  handleToggleShowExpandedItem,
  index,
  orderDates,
}) => {
  const [active, setActive] = useState(false)
  const longPressProps = useCallback(
    useLongPress({
      onLongPress: (ev) => {
        window.matchMedia('(max-width: 640px)').matches && setActive(true)
      },
    })
  )

  const { data: { item } = {}, loading } = useQuery(GET_ITEM, {
    variables: {
      id: id,
    },
  })

  if (loading) return null
  return (
    <>
      <tr
        {...longPressProps}
        className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}
      >
        {active && (
          <Portal>
            <EditItemWindow item={item} active={active} setActive={setActive} />
          </Portal>
        )}
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
          <tr {...longPressProps}>
            <td className='hidden md:block' />
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
