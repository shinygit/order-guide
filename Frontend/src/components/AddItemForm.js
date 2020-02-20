import React, { useState } from 'react'
import { CREATE_ITEM, GET_LATEST_ORDER } from '../Queries/item'
import { useMutation } from '@apollo/react-hooks'
import produce from 'immer'

const AddItemForm = ({ suppliers, locations }) => {
  const [createItem] = useMutation(CREATE_ITEM, {
    update (client, { data: { createItem } }) {
      const queryResults = client.readQuery({
        query: GET_LATEST_ORDER,
        variables: { orderDepth: 1 }
      })
      console.log(createItem)
      const results = {
        ...queryResults,
        orders: [
          {
            ...queryResults.orders[0],
            items: [...queryResults.orders[0].items, createItem]
          }
        ]
      }
      client.writeQuery({
        query: GET_LATEST_ORDER,
        variables: { orderDepth: 1 },
        data: results
      })
    }
  })

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
    event.preventDefault()

    createItem({
      variables: {
        input: {
          itemName: itemForm.itemName,
          supplier: itemForm.supplier,
          location: itemForm.location,
          buildTo: parseInt(itemForm.buildTo)
        }
      }
    })
    setItemForm({
      itemName: '',
      supplier: '',
      location: '',
      buildTo: ''
    })
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
