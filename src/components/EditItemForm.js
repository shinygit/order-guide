import React from 'react'

const EditItemForm = ({ items, dispatchItems, suppliers, editItemForm, setEditItemForm }) => {
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
    setEditItemForm({
      itemName: '',
      supplier: ''
    })
    event.preventDefault()
  }

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
    </form>
  )
}
export default EditItemForm
