import React, { useCallback, useRef, useEffect } from 'react'
import TableItemRow from './TableItemRow'
import EditItemForm from './EditItemForm'
import TableDescription from './TableDescription'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import fuzzysort from 'fuzzysort'

import { ORDER_DATES } from '../../Queries/order'
import { FILTER_QUERY } from '../../Queries/filter'
import { GET_SUPPLIERS_WITH_ORDER_STATUS } from '../../Queries/supplier'

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

const ListItems = ({ items, orderId }) => {
  const { data } = useQuery(FILTER_QUERY)
  const {
    searchTerm,
    filterName,
    filterType,
    hideAllZeroOrderAmount,
  } = data.filter

  const { loading: supplierLoading, data: supplierData = {} } = useQuery(
    GET_SUPPLIERS_WITH_ORDER_STATUS,
    {
      variables: { orderId: orderId },
    }
  )
  const { suppliers = [] } = supplierData

  const uncheckedItems = useRef([])
  if (filterType === 'UNCHECKED') {
    items.map((item) => {
      if (item.orderAmount === null) uncheckedItems.current.push(item)
      return null
    })
  }
  if (filterType !== 'UNCHECKED') {
    uncheckedItems.current = []
  }
  const filteredItems = items.filter((item) => {
    if (searchTerm) {
      const searchResults = fuzzysort.go(searchTerm, items, {
        key: 'itemName',
        limit: 10,
        threshold: -10000,
      })
      return searchResults.map((x, i) => searchResults[i].obj).includes(item)
    }
    if (filterName === 'ALL' && filterType === 'ALL') return true
    if (
      (filterName === 'SHORTED' &&
        filterType === 'SHORTED' &&
        (item.orderAmount < item.quantityReceived ||
          item.orderAmount > item.quantityReceived) &&
        suppliers.find((supplier) => supplier.supplierName === item.supplier)
          ?.wasOrderReceived === true) ||
      (item.flaggedByReceiver &&
        filterName === 'SHORTED' &&
        filterType === 'SHORTED')
    )
      return true
    if (
      filterName === 'DOUBLECHECK' &&
      filterType === 'DOUBLECHECK' &&
      item.previousOrders.filter((x) => x > 0).length >= 3 &&
      item.orderAmount < 1
    )
      return true
    if (
      filterType === 'UNCHECKED' &&
      uncheckedItems.current.filter((e) => e.id === item.id).length > 0
    ) {
      return true
    }
    if (filterType === 'supplier' && item.supplier === filterName) return true
    if (filterType === 'location' && item.location === filterName) return true
    return false
  })
  const hideAllZeroOrderAmountItems = filteredItems.filter((item) => {
    if (hideAllZeroOrderAmount && searchTerm === '') {
      if (item.specialNote) return true
      if (item.orderAmount === 0) return false
      return true
    }
    return true
  })
  let itemsToDisplay = hideAllZeroOrderAmountItems
    .slice()
    .sort(function (a, b) {
      if (a.supplier > b.supplier) return 1
      if (a.supplier < b.supplier) return -1
      if (a.location > b.location) return 1
      if (a.location < b.location) return -1
      if (a.itemName > b.itemName) return 1
      if (a.itemName < b.itemName) return -1
      return 0
    })
  if (searchTerm) itemsToDisplay = filteredItems

  const [toggle] = useMutation(TOGGLE_SHOW_EDIT_ITEM_FORM)
  const handleToggleEdit = useCallback(
    (id) => toggle({ variables: { itemId: id } }),
    [toggle]
  )
  const { data: orderDates } = useQuery(ORDER_DATES, {
    variables: { orderDepth: 3 },
  })

  const [toggleExpanded] = useMutation(TOGGLE_EXPANDED_ITEM)
  const handleToggleShowExpandedItem = useCallback(
    (id) => toggleExpanded({ variables: { itemId: id } }),
    [toggleExpanded]
  )

  return (
    <div className='flex flex-col items-center rounded border border-gray-700 bg-yellow-100 shadow-inner p-2'>
      <TableDescription
        filterName={filterName}
        filterType={filterType}
        suppliers={suppliers}
      />
      <table className='table-auto text-lg xl:w-10/12'>
        <thead>
          <tr>
            <th className='hidden md:table-cell' />
            <th className='px-2 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
              Item
            </th>
            <th className='hidden md:table-cell px-2 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
              Unit Size
            </th>
            <th className='hidden md:table-cell px-2 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
              Product #
            </th>
            <th className='px-2 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
              Build To
            </th>
            {(orderDates && orderDates.orders[2] && (
              <th className='hidden lg:table-cell px-2 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
                {orderDates.orders[2].orderDate.slice(5).replace('-', '/')}
              </th>
            )) || (
              <th className='hidden lg:table-cell px-2 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
                --/--
              </th>
            )}
            {(orderDates && orderDates.orders[1] && (
              <th className='px-2 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
                {orderDates.orders[1].orderDate.slice(5).replace('-', '/')}
              </th>
            )) || (
              <th className='px-2 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
                --/--
              </th>
            )}
            <th className='px-2 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
              Order
            </th>
            <th className='z-10 hidden md:table-cell px-2 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
              Supplier
            </th>
            <th className='hidden md:table-cell px-2 py-2 border border-gray-700 sticky top-0 bg-yellow-200'>
              Location
            </th>
          </tr>
        </thead>
        <tbody>
          {itemsToDisplay.map((item, index) => {
            if (item.showEditForm) {
              return (
                <EditItemForm
                  key={item.id}
                  item={item}
                  handleToggleEdit={handleToggleEdit}
                />
              )
            } else {
              return (
                <TableItemRow
                  index={index}
                  orderDates={orderDates}
                  key={item.id}
                  id={item.id}
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

export default React.memo(ListItems)
