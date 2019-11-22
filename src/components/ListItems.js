import React from 'react'
const ListItems = ({ items, handleDelete, filter, handleEdit }) => {
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
        </li>
      ))}
    </ul>
  )
}
export default ListItems
