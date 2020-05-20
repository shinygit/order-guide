import React, { useState } from 'react'
import { CREATE_ITEM, GET_LATEST_ORDER } from '../Queries/item'
import { useMutation } from '@apollo/react-hooks'
import FieldSupplierSelector from './ItemTable/FieldSupplierSelector'

const AddItemForm = ({ suppliers, locations, toggleNewItem }) => {
  const [createItem] = useMutation(CREATE_ITEM, {
    update(client, { data: { createItem } }) {
      console.log(createItem)
      const queryResults = client.readQuery({
        query: GET_LATEST_ORDER,
        variables: { orderDepth: 1 },
      })

      const results = {
        ...queryResults,
        orders: [
          {
            ...queryResults.orders[0],
            items: [...queryResults.orders[0].items, createItem],
          },
        ],
      }
      client.writeQuery({
        query: GET_LATEST_ORDER,
        variables: { orderDepth: 1 },
        data: results,
      })
    },
  })
  const [itemFormErrors, setItemFormErrors] = useState({})
  const [itemForm, setItemForm] = useState({
    itemName: '',
    supplier: '',
    location: '',
    buildTo: '',
  })
  const handleChangeInput = (event) => {
    setItemForm({
      ...itemForm,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!itemForm.itemName) {
      return setItemFormErrors({
        ...itemFormErrors,
        itemName: 'An item must have a name.',
      })
    }
    if (!itemForm.buildTo) {
      return setItemFormErrors({
        ...itemFormErrors,
        buildTo: 'An item must have a build to amount.',
      })
    }

    if (!itemForm.location) {
      return setItemFormErrors({
        ...itemFormErrors,
        location: 'An item must have a location.',
      })
    }
    createItem({
      variables: {
        input: {
          itemName: itemForm.itemName,
          supplier: itemForm.supplier,
          location: itemForm.location,
          buildTo: parseInt(itemForm.buildTo),
        },
      },
    })
    setItemForm({
      itemName: '',
      supplier: '',
      location: '',
      buildTo: '',
    })
    toggleNewItem()
  }

  return (
    <form className='flex' onSubmit={handleSubmit}>
      <div className='flex flex-col mx-1 w-1/4'>
        <label className=''>Item Name:</label>
        <input
          className={`border py-2 px-3 text-gray-900 ${itemFormErrors.itemName &&
            itemFormFieldError}`}
          type='text'
          name='itemName'
          value={itemForm.itemName}
          onChange={handleChangeInput}
          onFocus={() => setItemFormErrors({})}
        />
      </div>
      <div className='flex flex-col mx-1 w-1/12'>
        <label>Build To: </label>
        <input
          className={`border py-2 px-3 text-gray-900 ${itemFormErrors.buildTo &&
            itemFormFieldError}`}
          type='number'
          name='buildTo'
          value={itemForm.buildTo}
          onChange={handleChangeInput}
          onFocus={() => setItemFormErrors({})}
        />
      </div>
      <div className='flex flex-col mx-1 w-1/4'>
        <label>Supplier:</label>
        <FieldSupplierSelector
          handleChangeInput={handleChangeInput}
          currentSupplierSelection={itemForm.supplier}
        />
      </div>
      <div className='flex flex-col mx-1 w-1/4'>
        <label>Location:</label>
        <input
          className={`border py-2 px-3 text-gray-900 ${itemFormErrors.location &&
            itemFormFieldError}`}
          type='text'
          name='location'
          list='locationList'
          value={itemForm.location}
          onChange={handleChangeInput}
          onFocus={() => setItemFormErrors({})}
        />
        <datalist id='locationList'>
          {locations.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>
      </div>
      <button
        className='w-auto p-4 mx-1 border border-gray-900 rounded bg-gray-100 ml-auto'
        type='submit'
      >
        Add Item
      </button>
    </form>
  )
}
export default AddItemForm

const itemFormFieldError = 'bg-red-100 border-red-500'
