import React, { useState, useEffect } from 'react'

const EditItemForm = ({ item, dispatchItems, suppliers, handleDelete }) => {
  const [editItemForm, setEditItemForm] = useState({
    id: item.id,
    itemName: item.itemName,
    supplier: item.supplier

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
        supplier: editItemForm.supplier
      })
    }
    event.preventDefault()
  }

  useEffect(() =>
    setEditItemForm({
      id: item.id,
      itemName: item.itemName,
      supplier: item.supplier
    }), [item]
  )
  return (
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
      <button type='submit'>Edit Item</button>
      <button type='button' onClick={() => handleDelete(editItemForm.id)}>DELETE</button>
    </form>
  )
}
export default EditItemForm
