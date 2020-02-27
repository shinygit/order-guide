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
  const handleDelete = id => {
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
        />
      </td>
      <td className='border border-gray-700 text-center px-1'>
        <input
          type='text'
          name='itemName'
          value={editItemForm.itemName}
          onChange={handleChangeinput}
        />
      </td>
      <td className='border border-gray-700 text-center'>
        <input
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
      <td className='border border-gray-700 text-center'>
        <button onClick={() => handleDelete(item.id)} />
      </td>
    </tr>
  )
}
export default EditItemForm
