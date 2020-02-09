import React, { useCallback } from 'react'
import styled from 'styled-components'
import TableItemRow from './TableItemRow'
import EditItemForm from './EditItemForm'

import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const ListItems = ({
  items,
  handleDelete,
  filter,
  sort,
  dispatchItems,
  dispatchSort,
  suppliers,
  locations,
  searchTerm
}) => {
  let itemsToDisplay = items.filter(item => {
    if (filter === 'ALL') {
      return true
    }
    if (Array.isArray(filter) && filter.includes(item)) {
      return true
    }
    if (item.supplier === filter.supplier) {
      return true
    }
    if (item.location === filter.location) {
      return true
    }
    return false
  })
  if (Array.isArray(filter)) {
    itemsToDisplay = filter
  }

  const TOGGLE_SHOW_EDIT_ITEM_FORM = gql`
    mutation toggleShowEditItemForm($itemId: ID!) {
      toggleShowEditItemForm(id: $itemId) @client
    }
  `
  const [toggle, { loading, error }] = useMutation(TOGGLE_SHOW_EDIT_ITEM_FORM)
  const handleEdit = id => toggle({ variables: { itemId: id } })
  return (
    <Div>
      <Table>
        <tbody>
          <tr>
            <Th />
            <Th>Item</Th>
            <MinTh>Build To</MinTh>
            <MinTh>Two Weeks Ago</MinTh>
            <MinTh>Last Week</MinTh>
            <MinTh>Order</MinTh>
            <Th>Supplier</Th>
            <Th>Location</Th>
          </tr>
          {itemsToDisplay.map(item => {
            if (item.showEditForm) {
              return (
                <EditItemForm
                  key={item.id}
                  item={item}
                  dispatchItems={dispatchItems}
                  suppliers={suppliers}
                  locations={locations}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              )
            } else {
              return (
                <TableItemRow
                  key={item.id}
                  item={item}
                  dispatchItems={dispatchItems}
                  handleEdit={handleEdit}
                />
              )
            }
          })}
        </tbody>
      </Table>
    </Div>
  )
}
const Th = styled.th`
  background: white;
  position: sticky;
  top: 0;
  box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
`

const MinTh = styled(Th)`
  border: 1px solid grey;
`

const Table = styled.table`
  white-space: nowrap;
  margin: 0px auto;
  margin-top: 10px;
  width: 90%;
  border-spacing: 0px;
  background: #fff;
  box-shadow: 0 1px 0 0 rgba(22, 29, 37, 0.05);
`
const Div = styled.div`
  max-width: 100vw;
`
export default ListItems
