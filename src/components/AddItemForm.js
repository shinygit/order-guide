import React from 'react'

const AddItemForm = ({ items, dispatchItems, suppliers, itemForm, setItemForm }) => {
  const handleChangeInput = event => {
    setItemForm({
      ...itemForm,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = event => {
    if (itemForm) {
      dispatchItems({
        type: 'ADD_ITEM',
        itemName: itemForm.itemName,
        supplier: itemForm.supplier
      })
    }
    setItemForm({
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
          value={itemForm.itemName}
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
          value={itemForm.supplier}
          onChange={handleChangeInput}
        />
        <datalist id='suppliersList'>
          {suppliers.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>
      </label>
      <button type='submit'>Add Item</button>
    </form>
  )
}
export default AddItemForm
