import React, { useState } from 'react'

import api from '../api/items'
import uuid from 'uuid'

const AddItemForm = ({
  items,
  dispatchItems,
  suppliers,
  locations,
  currentDate,
  user,
  company
}) => {
  const [itemForm, setItemForm] = useState({
    itemName: '',
    supplier: '',
    location: '',
    buildTo: '',
    order: 0,
    showEditForm: false,
    isLocked: false,
    submittedForWeek: currentDate,
    itemID: uuid(),
    user: '',
    company: '',
    previousOrders: {
      lastWeek: 0,
      twoWeeksAgo: 0
    }
  })
  const handleChangeInput = event => {
    setItemForm({
      ...itemForm,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (itemForm) {
      api.insertItem(itemForm).then(res => {
        dispatchItems({
          type: 'ADD_ITEM',
          _id: res.data._id,
          itemName: itemForm.itemName,
          supplier: itemForm.supplier,
          location: itemForm.location,
          buildTo: itemForm.buildTo,
          order: itemForm.order,
          showEditForm: itemForm.showEditForm,
          isLocked: itemForm.isLocked,
          submittedForWeek: itemForm.submittedForWeek,
          itemID: itemForm.itemID,
          user: res.data.user,
          company: itemForm.company,
          previousOrders: itemForm.previousOrders
        })
        setItemForm({
          itemName: '',
          supplier: '',
          location: '',
          buildTo: '',
          order: 0,
          showEditForm: false,
          isLocked: false,
          submittedForWeek: currentDate,
          itemID: uuid(),
          user: user,
          company: company,
          previousOrders: {
            lastWeek: 0,
            twoWeeksAgo: 0
          }
        })
      })
    }
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
