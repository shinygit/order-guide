import React from 'react'
import ChangeOrderAmount from './ChangeOrderAmount'
import EditItemForm from './EditItemForm'
const ListItems = ({ items, handleDelete, filter, dispatchItems, suppliers, locations }) => {
  const filteredItems = items.filter(item => {
    if (filter === 'ALL') {
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
  const handleEdit = (id) => {
    dispatchItems({ type: 'TOGGLE_EDIT', id: id })
  }
  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>
          <label onClick={() => handleEdit(item.id)}>{item.itemName}</label>
          <ChangeOrderAmount id={item.id} orderAmount={item.order} dispatchItems={dispatchItems} />
          {item.showEditForm && <EditItemForm filter={filter} item={item} dispatchItems={dispatchItems} suppliers={suppliers} locations={locations} handleDelete={handleDelete} />}
        </li>
      ))}
    </ul>
  )
}
export default ListItems
