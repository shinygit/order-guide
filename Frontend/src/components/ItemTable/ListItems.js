import React, { useCallback, useRef } from 'react'
import TableItemRow from './TableItemRow'
import EditItemForm from './EditItemForm'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Fuse from 'fuse.js'
import { ORDER_DATES } from '../../Queries/order'
import { FILTER_QUERY } from '../../Queries/filter'

const TOGGLE_SHOW_EDIT_ITEM_FORM = gql`
  mutation toggleShowEditItemForm($itemId: ID!) {
    toggleShowEditItemForm(id: $itemId) @client
  }
`

const TOGGLE_EXPANDED_ITEM = gql`
  mutation toggleShowExpandedItem($itemId: ID!) {
    toggleShowExpandedItem(id: $itemId) @client
  }
`

const ListItems = ({ items, suppliers, locations }) => {
  const { data } = useQuery(FILTER_QUERY)
  const { searchTerm, filterName, filterType } = data.filter

  const uncheckedItems = useRef([])
  if (filterType === 'UNCHECKED') {
    items.map(item => {
      if (item.orderAmount === null) uncheckedItems.current.push(item)
      return null
    })
  }
  if (filterType !== 'UNCHECKED') {
    uncheckedItems.current = []
  }

  const fuse = new Fuse(items, { keys: ['itemName'] })
  const fuseResults = fuse.search(searchTerm)

  const filteredItems = items.filter(item => {
    if (searchTerm !== '') {
      return fuseResults.includes(item)
    }
    if (filterName === 'ALL' && filterType === 'ALL') return true
    if (
      filterType === 'UNCHECKED' &&
      uncheckedItems.current.filter(e => e.id === item.id).length > 0
    ) {
      return true
    }

    if (Object.values(item).includes(filterType && filterName)) return true
    return false
  })
  const itemsToDisplay = filteredItems.slice().sort(function (a, b) {
    if (a.supplier > b.supplier) return 1
    if (a.supplier < b.supplier) return -1
    if (a.location > b.location) return 1
    if (a.location < b.location) return -1
    if (a.itemName > b.itemName) return 1
    if (a.itemName < b.itemName) return -1
    return 0
  })
  const [toggle] = useMutation(TOGGLE_SHOW_EDIT_ITEM_FORM)
  const handleToggleEdit = useCallback(
    id => toggle({ variables: { itemId: id } }),
    [toggle]
  )
  const { data: orderDates } = useQuery(ORDER_DATES, {
    variables: { orderDepth: 3 }
  })

  const [toggleExpanded] = useMutation(TOGGLE_EXPANDED_ITEM)
  const handleToggleShowExpandedItem = id =>
    toggleExpanded({ variables: { itemId: id } })

  return (
    <div className='rounded border border-gray-700 bg-yellow-100 shadow-inner p-2'>
      <table className='table-fixed m-auto text-lg'>
        <thead>
          <tr>
            <th className='w-5 hidden md:table-cell' />
            <th className='px-4 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
              Item
            </th>
            <th className='px-4 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
              Build To
            </th>
            <th className='hidden md:table-cell px-4 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
              Size
            </th>
            {(orderDates && orderDates.orders[2] && (
              <th className='hidden md:table-cell px-4 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
                {orderDates.orders[2].orderDate.slice(5).replace('-', '/')}
              </th>
            )) || (
              <th className='hidden md:table-cell px-4 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
                --/--
              </th>
            )}
            {(orderDates && orderDates.orders[1] && (
              <th className='px-4 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
                {orderDates.orders[1].orderDate.slice(5).replace('-', '/')}
              </th>
            )) || (
              <th className='px-4 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
                --/--
              </th>
            )}
            <th className='px-4 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
              Order
            </th>
            <th className='hidden md:table-cell px-4 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
              Supplier
            </th>
            <th className='hidden md:table-cell px-4 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
              Location
            </th>
          </tr>
        </thead>
        <tbody>
          {itemsToDisplay.map(item => {
            if (item.showEditForm) {
              return (
                <EditItemForm
                  key={item.id}
                  item={item}
                  suppliers={suppliers}
                  locations={locations}
                  handleToggleEdit={handleToggleEdit}
                />
              )
            } else {
              return (
                <TableItemRow
                  key={item.id}
                  item={item}
                  handleToggleEdit={handleToggleEdit}
                  handleToggleShowExpandedItem={handleToggleShowExpandedItem}
                />
              )
            }
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ListItems
