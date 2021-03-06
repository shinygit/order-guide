import React, { useState, useCallback } from 'react'
import ChangeOrderAmount from './ChangeOrderAmount'
import TableItemRowExpanded from './TableItemRowExpanded'
import ClipboardDown from './icons/ClipboardDown'
import ClipboardUp from './icons/ClipboardUp'
import MarketPriceSupplierSelector from './MarketPriceSupplierSelector'
import { useQuery } from '@apollo/react-hooks'
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
      category
      buildTo
      quantityOnHand
      quantityReceived
      orderAmount
      unitPriceInPennies
      isMarketPrice
      isInfrequent
      productNumber
      unitSize
      itemNote
      specialNote
      receivingNote
      previousOrders
      showEditForm @client
      isExpanded @client
      flaggedByReceiver
      receiverNote
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
        window.matchMedia('(orientation: portrait)').matches && setActive(true)
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
        className={`h-10 md:h-auto ${
          index % 2 === 0 ? 'bg-gray-200' : 'bg-white'
        } ${item.flaggedByReceiver ? 'bg-red-200' : null}`}
      >
        {active && (
          <Portal>
            <EditItemWindow item={item} active={active} setActive={setActive} />
          </Portal>
        )}
        <td className='hidden text-right bg-yellow-100 md:table-cell'>
          <button onClick={() => handleToggleShowExpandedItem(item.id)}>
            {item.isExpanded ? <ClipboardUp /> : <ClipboardDown />}
          </button>
        </td>
        <td className='px-1 text-center border border-gray-700'>
          {item.itemName}
        </td>
        <td className='hidden text-center border border-gray-700 md:table-cell'>
          {item.unitSize}
        </td>
        <td className='hidden text-center border border-gray-700 md:table-cell'>
          {item.productNumber}
        </td>
        <td className='text-center border border-gray-700'>{item.buildTo}</td>
        <td className='hidden text-center border border-gray-700 lg:table-cell'>
          {item.previousOrders[1]}
        </td>
        <td className='text-center border border-gray-700'>
          {item.previousOrders[0]}
        </td>
        <td className='text-center border border-gray-700'>
          <ChangeOrderAmount id={item.id} orderDates={orderDates} />
        </td>
        <td className='hidden px-1 text-center border border-gray-700 md:table-cell'>
          {item.isMarketPrice && !orderDates?.orders[0].isLocked ? (
            <MarketPriceSupplierSelector item={item} />
          ) : (
            item.supplier
          )}
        </td>
        <td className='hidden px-1 text-center border border-gray-700 md:table-cell'>
          {item.location}
        </td>
      </tr>
      {item.flaggedByReceiver ? (
        <>
          <tr>
            <td className='hidden md:block' />
            <td className={`border border-gray-700 bg-red-200`} colSpan='9'>
              Flagged By: {item.flaggedByReceiver}
            </td>
          </tr>
          <tr className='' />
        </>
      ) : null}
      {!item.isExpanded && item.receiverNote ? (
        <>
          <tr>
            <td className='hidden md:block' />
            <td className={`border border-gray-700 bg-red-200`} colSpan='9'>
              Receiver Note: {item.receiverNote}
            </td>
          </tr>
          <tr className='' />
        </>
      ) : null}
      {!item.isExpanded && item.itemNote ? (
        <>
          <tr>
            <td className='hidden md:block' />
            <td
              className={`border border-gray-700 ${
                index % 2 === 0 ? 'bg-gray-200' : 'bg-white'
              } ${item.flaggedByReceiver ? 'bg-red-200' : null}`}
              colSpan='9'
            >
              Item Note: {item.itemNote}
            </td>
          </tr>
          <tr className='' />
        </>
      ) : null}
      {!item.isExpanded && item.specialNote ? (
        <>
          <tr {...longPressProps}>
            <td className='hidden md:block' />
            <td
              className={`border border-gray-700 ${
                index % 2 === 0 ? 'bg-gray-200' : 'bg-white'
              } ${item.flaggedByReceiver ? 'bg-red-200' : null}`}
              colSpan='9'
            >
              Special Note: {item.specialNote}
            </td>
          </tr>
          <tr className='' />
        </>
      ) : null}
      {!item.isExpanded && item.receivingNote ? (
        <>
          <tr>
            <td className='hidden md:block' />
            <td
              className={`border border-gray-700 ${
                index % 2 === 0 ? 'bg-gray-200' : 'bg-white'
              } ${item.flaggedByReceiver ? 'bg-red-200' : null}`}
              colSpan='9'
            >
              Receiving Note: {item.receivingNote}
            </td>
          </tr>
          <tr className='' />
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
