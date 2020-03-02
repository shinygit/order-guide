import React, { useState, useEffect } from 'react'
import ChangeOrderAmount from './ChangeOrderAmount'
import { EDIT_ITEM, DELETE_ITEM, GET_LATEST_ORDER } from '../../Queries/item'
import { useMutation } from '@apollo/react-hooks'
import { produce } from 'immer'

const EditItemForm = ({
  item,
  dispatchItems,
  suppliers,
  locations,
  handleEdit
}) => {
  const [edit] = useMutation(EDIT_ITEM)
  const [deleteItem] = useMutation(DELETE_ITEM)
  const [editItemForm, setEditItemForm] = useState({
    id: item.id,
    itemName: item.itemName,
    buildTo: item.buildTo,
    supplier: item.supplier,
    location: item.location,
    order: item.orderAmount,
    showEditForm: item.showEditForm
  })
  const handleChangeinput = event => {
    setEditItemForm({
      ...editItemForm,
      [event.target.name]: event.target.value
    })
  }
  const handleDelete = (id, itemName) => {
    if (window.confirm(`Are you sure you want to delete ${itemName}`)) {
      deleteItem({
        variables: { id: id },
        update: client => {
          const previous = client.readQuery({
            query: GET_LATEST_ORDER,
            variables: { orderDepth: 1 }
          })
          const { items } = previous.orders[0]
          const next = produce(previous, draft => {
            draft.orders[0].items = items.filter(item => item.id !== id)
          })

          client.writeQuery({
            query: GET_LATEST_ORDER,
            variables: { orderDepth: 1 },
            data: next
          })
        }
      })
    }
  }

  const handleSubmit = () => {
    edit({
      variables: {
        id: editItemForm.id,
        input: {
          itemName: editItemForm.itemName,
          buildTo: parseInt(editItemForm.buildTo),
          supplier: editItemForm.supplier,
          location: editItemForm.location
        }
      }
    })
    handleEdit(item.id)
  }
  useEffect(
    () =>
      setEditItemForm({
        id: item.id,
        itemName: item.itemName,
        buildTo: item.buildTo,
        supplier: item.supplier,
        location: item.location,
        orderAmount: item.orderAmount,
        showEditForm: false
      }),
    [item]
  )

  return (
    <tr>
      <td>
        <button
          onClick={() => {
            handleSubmit()
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-5 h-5'
            viewBox='0 0 20 20'
          >
            <path d='M0 2C0 .9.9 0 2 0h14l4 4v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5 0v6h10V2H5zm6 1h3v4h-3V3z' />
          </svg>
        </button>
      </td>
      <td className='border border-gray-700 text-center px-1'>
        <input
          className='bg-white focus:outline-none
        focus:shadow-outline border border-gray-300
         rounded-lg py-2 px-2 mb-1 w-32'
          type='text'
          name='itemName'
          value={editItemForm.itemName}
          onChange={handleChangeinput}
        />
      </td>
      <td className='border border-gray-700 text-center'>
        <input
          className='bg-white focus:outline-none
        focus:shadow-outline border border-gray-300
         rounded-lg py-2 px-2 mb-1 w-12'
          type='number'
          name='buildTo'
          value={editItemForm.buildTo}
          onChange={handleChangeinput}
        />
      </td>
      <td className='border border-gray-700 text-center'>
        {item.previousOrders[1]}
      </td>
      <td className='border border-gray-700 text-center'>
        {item.previousOrders[0]}
      </td>
      <td className='border border-gray-700 text-center'>
        <ChangeOrderAmount
          id={item.id}
          orderAmount={item.orderAmount}
          dispatchItems={dispatchItems}
        />
      </td>
      <td className='border border-gray-700 text-center px-1'>
        <input
          className='bg-white focus:outline-none
        focus:shadow-outline border border-gray-300
         rounded-lg py-2 px-2 mb-1 w-32'
          type='text'
          name='supplier'
          list='suppliersList'
          value={editItemForm.supplier}
          onChange={handleChangeinput}
        />
        <datalist id='suppliersList'>
          {suppliers.map(item => (
            <option key={item} value={item} />
          ))}
        </datalist>
      </td>
      <td className='border border-gray-700 text-center px-1'>
        <input
          className='bg-white focus:outline-none
        focus:shadow-outline border border-gray-300
         rounded-lg py-2 px-2 mb-1 w-32'
          type='text'
          name='location'
          list='locationsList'
          value={editItemForm.location}
          onChange={handleChangeinput}
        />
        <datalist id='locationsList'>
          {locations.map(item => (
            <option key={item} value={item} />
          ))}
        </datalist>
      </td>
      <td className=''>
        <button onClick={() => handleDelete(item.id, item.itemName)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
          >
            <path d='M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z' />
          </svg>
        </button>
      </td>
    </tr>
  )
}
export default EditItemForm
