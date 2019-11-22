import React from 'react'
const ListItems = ({ handleDelete, filteredItems, handleEdit }) => {
  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>
          <label onClick={() => handleEdit(item.id)}>{item.itemName}</label>
          <button onClick={() => handleDelete(item.id)}>DELETE</button>
        </li>
      ))}
    </ul>
  )
}
export default ListItems
