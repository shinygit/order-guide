import React, { useState } from 'react'

const AddItemForm = ({ items, dispatchItems, suppliers, locations }) => {
  const [itemForm, setItemForm] = useState({
    itemName: '',
    supplier: '',
    location: '',
    buildTo: ''
  })
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
        supplier: itemForm.supplier,
        location: itemForm.location,
        buildTo: itemForm.buildTo
      })
    }
    setItemForm({
      itemName: '',
      supplier: '',
      location: '',
      buildTo: ''
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
        Build To:
        <input
          type='text'
          name='buildTo'
          value={itemForm.buildTo}
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
          {suppliers.map(item => (
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
          value={itemForm.location}
          onChange={handleChangeInput}
        />
        <datalist id='locationList'>
          {locations.map(item => (
            <option key={item} value={item} />
          ))}
        </datalist>
      </label>
      <button type='submit'>Add Item</button>
    </form>
  )
}
export default AddItemForm
