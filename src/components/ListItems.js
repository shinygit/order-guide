import React from 'react'
import ChangeOrderAmount from './ChangeOrderAmount'
const ListItems = ({ items, handleDelete, filter, handleEdit, dispatchItems }) => {
  const filteredItems = items.filter(item => {
    if (filter === 'ALL') {
      return true
    }
    if (item.supplier === filter.supplier) {
      return true
    }
    return false
  })

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>
          <label onClick={() => handleEdit(item.id)}>{item.itemName}</label>
          <ChangeOrderAmount id={item.id} orderAmount={item.order} dispatchItems={dispatchItems} />
        </li>
      ))}
    </ul>
  )
}
export default ListItems
