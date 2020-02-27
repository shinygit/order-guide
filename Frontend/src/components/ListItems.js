import React, { useCallback, useRef } from 'react'
import TableItemRow from './TableItemRow'
import EditItemForm from './EditItemForm'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Fuse from 'fuse.js'
import { ORDER_DATES } from '../Queries/order'

const FILTER_QUERY = gql`
  query activeFilters {
    filter {
      searchTerm @client
      filterName @client
      filterType @client
    }
  }
`
const TOGGLE_SHOW_EDIT_ITEM_FORM = gql`
  mutation toggleShowEditItemForm($itemId: ID!) {
    toggleShowEditItemForm(id: $itemId) @client
  }
`

const ListItems = ({ items, suppliers, locations }) => {
  const { data } = useQuery(FILTER_QUERY)
  const { searchTerm, filterName, filterType } = data.filter

  const uncheckedItems = useRef([])
  if (filterType === 'UNCHECKED') {
    items.map(item => {
      if (item.orderAmount === null) uncheckedItems.current.push(item)
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
  })
  const itemsToDisplay = filteredItems.slice().sort(function(a, b) {
    if (a.supplier > b.supplier) return 1
    if (a.supplier < b.supplier) return -1
    if (a.location > b.location) return 1
    if (a.location < b.location) return -1
    if (a.itemName > b.itemName) return 1
    if (a.itemName < b.itemName) return -1
    return 0
  })
  const [toggle] = useMutation(TOGGLE_SHOW_EDIT_ITEM_FORM)
  const handleEdit = useCallback(
    id => toggle({ variables: { itemId: id } }),
    []
  )
  const { data: orderDates } = useQuery(ORDER_DATES, {
    variables: { orderDepth: 3 }
  })
  return (
    <div>
      <table>
        <tr>
          <th />
          <th>Item</th>
          <th>Build To</th>
          {orderDates && (
            <th>{orderDates.orders[2].orderDate.slice(5).replace('-', '/')}</th>
          )}
          {orderDates && (
            <th>{orderDates.orders[1].orderDate.slice(5).replace('-', '/')}</th>
          )}
          <th>Order</th>
          <th>Supplier</th>
          <th>Location</th>
        </tr>
        <tbody>
          {itemsToDisplay.map(item => {
            if (item.showEditForm) {
              return (
                <EditItemForm
                  key={item.id}
                  item={item}
                  suppliers={suppliers}
                  locations={locations}
                  handleEdit={handleEdit}
                />
              )
            } else {
              return (
                <TableItemRow
                  key={item.id}
                  item={item}
                  handleEdit={handleEdit}
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
