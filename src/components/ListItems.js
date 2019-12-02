import React, { useCallback } from 'react'
import styled from 'styled-components'
import TableItemRow from './TableItemRow'
import EditItemForm from './EditItemForm'
const ListItems = ({
  items,
  handleDelete,
  filter,
  sort,
  dispatchItems,
  dispatchSort,
  suppliers,
  locations,
  searchTerm,
  itemsCurrentlySorted
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
    itemsToDisplay = itemsToDisplay.sort((a, b) => {
      return filter.indexOf(a) - filter.indexOf(b)
    })
  }
  if (itemsCurrentlySorted) {
    itemsToDisplay = itemsToDisplay.sort((a, b) => {
      return sort.indexOf(a) - sort.indexOf(b)
    })
  }
  const handleEdit = useCallback(
    id => {
      dispatchItems({ type: 'TOGGLE_EDIT', id: id })
    },
    [dispatchItems]
  )
  return (
    <Div>
      <Table>
        <tbody>
          <tr>
            <Th />
            <Th>Item</Th>
            <Th>Build To</Th>
            <Th>Order</Th>
            <Th>Supplier</Th>
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
