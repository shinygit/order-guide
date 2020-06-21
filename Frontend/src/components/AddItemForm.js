import React, { useState } from 'react'
import { CREATE_ITEM, GET_LATEST_ORDER } from '../Queries/item'
import { useMutation } from '@apollo/react-hooks'
import FieldSupplierSelector from './ItemTable/FieldSupplierSelector'

const AddItemForm = ({ locations, formIsOpen, setFormIsOpen }) => {
  const [canceled, setCanceled] = useState(false)
  const [closing, setClosing] = useState(false)
  const closeForm = () => {
    setClosing(true)
    setTimeout(() => setFormIsOpen(false), 500)
  }
  const [createItem] = useMutation(CREATE_ITEM, {
    update(client, { data: { createItem } }) {
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
    setTimeout(() => closeForm(), 100)
  }

  return (
    <form
      className={`absolute top-0 right-0 mr-10 mt-10 flex flex-col p-2 bg-gray-300 shadow-2xl p-5 text-gray-900 transform duration-500 transition ${
        closing &&
        !canceled &&
        'translate-y-full scale-x-150 scale-y-0 -translate-x-1/2'
      }`}
      id='add-item-form'
      onSubmit={handleSubmit}
    >
      <div className='flex items-end my-1 justify-between'>
        <label className='mr-2'>ITEM NAME</label>
        <input
          className={`border py-2 px-3 ${
            itemFormErrors.itemName && itemFormFieldError
          }`}
          type='text'
          name='itemName'
          value={itemForm.itemName}
          onChange={handleChangeInput}
          onFocus={() => setItemFormErrors({})}
        />
      </div>
      <div className='flex items-end my-1 justify-between'>
        <label className='mr-2'>BUILD TO</label>
        <input
          className={`border py-2 px-3${
            itemFormErrors.buildTo && itemFormFieldError
          }`}
          type='number'
          name='buildTo'
          value={itemForm.buildTo}
          onChange={handleChangeInput}
          onFocus={() => setItemFormErrors({})}
        />
      </div>
      <div className='flex items-end my-1 justify-between'>
        <label className='mr-2'>SUPPLIER</label>
        <FieldSupplierSelector
          handleChangeInput={handleChangeInput}
          currentSupplierSelection={itemForm.supplier}
        />
      </div>
      <div className='flex items-end my-1 justify-between'>
        <label className='mr-2'>LOCATION</label>
        <input
          className={`border py-2 px-3 ${
            itemFormErrors.location && itemFormFieldError
          }`}
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
      <div className='flex justify-between mt-4'>
        <button
          className='self-end p-1 mx-1 border border-gray-900 rounded bg-gray-100'
          type='button'
          onClick={() => {
            setFormIsOpen(false)
          }}
        >
          Cancel
        </button>
        <button
          className='p-4 mx-1 border border-green-500 rounded bg-green-100'
          type='submit'
        >
          Add Item
        </button>
      </div>
    </form>
  )
}
export default AddItemForm

const itemFormFieldError = 'bg-red-100 border-red-500'
