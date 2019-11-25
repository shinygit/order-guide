import React, { useState, useEffect } from 'react'
import ChangeOrderAmount from './ChangeOrderAmount'

const EditItemForm = ({ item, dispatchItems, suppliers, locations, handleDelete, handleEdit }) => {
  const [editItemForm, setEditItemForm] = useState({
    id: item.id,
    itemName: item.itemName,
    supplier: item.supplier,
    location: item.location

  })
  const handleChangeInput = event => {
    setEditItemForm({
      ...editItemForm,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = event => {
    if (editItemForm) {
      dispatchItems({
        type: 'EDIT_ITEM',
        id: editItemForm.id,
        itemName: editItemForm.itemName,
        supplier: editItemForm.supplier,
        location: editItemForm.location
      })
    }
  }

  useEffect(() =>
    setEditItemForm({
      id: item.id,
      itemName: item.itemName,
      supplier: item.supplier,
      location: item.location
    }), [item]
  )

  return (
    <tr key={item.id}>
      <td onClick={() => { handleEdit(item.id); handleSubmit() }}>
        Edit
      </td>
      <td>
        <input
          type='text'
          name='itemName'
          value={editItemForm.itemName}
          onChange={handleChangeInput}
        />
      </td>
      <td>
        <ChangeOrderAmount
          id={item.id}
          orderAmount={item.order}
          dispatchItems={dispatchItems}
        />
      </td>
      <td>
        <button type='button' onClick={() => handleDelete(editItemForm.id)}>DELETE</button>
      </td>
    </tr>
  )
}
export default EditItemForm
/* return (
  <form onSubmit={handleSubmit}>
    <label>
      Item Name:
      <input
        type='text'
        name='itemName'
        value={editItemForm.itemName}
        onChange={handleChangeInput}
      />
    </label>
    <br />
    <label>
      Supplier
      <input
        type='text'
        name='supplier'
        list='suppliersList'
        value={editItemForm.supplier}
        onChange={handleChangeInput}
      />
      <datalist id='suppliersList'>
        {suppliers.map((item) => (
          <option key={item} value={item} />
        ))}
      </datalist>
    </label>
    <br />
    <label>
      Location
      <input
        type='text'
        name='location'
        list='locationList'
        value={editItemForm.location}
        onChange={handleChangeInput}
      />
      <datalist id='locationList'>
        {locations.map((item) => (
          <option key={item} value={item} />
        ))}
      </datalist>
    </label>
    <button type='submit'>Edit Item</button>
    <button type='button' onClick={() => handleDelete(editItemForm.id)}>DELETE</button>
  </form>
)
} */
