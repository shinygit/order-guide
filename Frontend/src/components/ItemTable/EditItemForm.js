import React, { useState, useEffect } from 'react'
import ChangeOrderAmount from './ChangeOrderAmount'
import { EDIT_ITEM, DELETE_ITEM, GET_LATEST_ORDER } from '../../Queries/item'
import { useMutation } from '@apollo/react-hooks'
import { produce } from 'immer'
import ClipboardUp from './icons/ClipboardUp'

const EditItemForm = ({ item, suppliers, locations, handleToggleEdit }) => {
  const [edit] = useMutation(EDIT_ITEM)
  const [deleteItem] = useMutation(DELETE_ITEM)
  const [editItemForm, setEditItemForm] = useState({
    id: item.id,
    itemName: item.itemName,
    buildTo: item.buildTo,
    supplier: item.supplier,
    location: item.location,
    orderAmount: item.orderAmount,
    productNumber: item.productNumber,
    unitSize: item.unitSize,
    unitPriceInPennies: item.unitPriceInPennies,
    isMarketPrice: item.isMarketPrice,
    quantityOnHand: item.quantityOnHand,
    quantityReceived: item.quantityReceived,
    itemNote: item.itemNote,
    specialNote: item.specialNote,
    receivingNote: item.receivingNote,
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
          location: editItemForm.location,
          productNumber: editItemForm.productNumber,
          unitSize: editItemForm.unitSize,
          unitPriceInPennies: editItemForm.unitPriceInPennies,
          isMarketPrice: !!editItemForm.isMarketPrice,
          quantityOnHand: editItemForm.quantityOnHand,
          quantityReceived: editItemForm.quantityReceived,
          itemNote: editItemForm.itemNote,
          specialNote: editItemForm.specialNote,
          receivingNote: editItemForm.receivingNote
        }
      }
    })
    handleToggleEdit(item.id)
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
        productNumber: item.productNumber,
        unitSize: item.unitSize,
        unitPriceInPennies: item.unitPriceInPennies,
        isMarketPrice: item.isMarketPrice,
        quantityOnHand: item.quantityOnHand,
        quantityReceived: item.quantityReceived,
        itemNote: item.itemNote,
        specialNote: item.specialNote,
        receivingNote: item.receivingNote,
        showEditForm: false
      }),
    [item]
  )

  return (
    <>
      <tr>
        <td>
          <button
            onClick={() => {
              handleToggleEdit(item.id)
            }}
          >
            <ClipboardUp />
          </button>
        </td>
        <td className='border border-gray-700 text-center px-1'>
          <input
            className='w-32 bg-gray-200'
            type='text'
            name='itemName'
            value={editItemForm.itemName}
            onChange={handleChangeinput}
          />
        </td>
        <td className='border border-gray-700 text-center'>
          <input
            className='w-16 bg-gray-200'
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
          <ChangeOrderAmount id={item.id} orderAmount={item.orderAmount} />
        </td>
        <td className='border border-gray-700 text-center'>
          <input
            className='w-32 bg-gray-200'
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
        <td className='border border-gray-700 text-center'>
          <input
            className='w-32 bg-gray-200'
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
        <td />
      </tr>
      <tr>
        <td>
          <button
            onClick={() => {
              handleToggleEdit(item.id)
            }}
          >
            Cancel
          </button>
        </td>
        <th colSpan='2' className={tableCell}>
          Product Number
        </th>
        <td colSpan='2' className={tableCell}>
          {item.productNumber}
        </td>
      </tr>
      <tr>
        <td>
          <button onClick={handleSubmit}>Save</button>
        </td>
        <th colSpan='2' className={tableCell}>
          Unit Size
        </th>
        <td className={tableCell}>{item.unitSize}</td>
      </tr>
      <tr>
        <td />
        <th colSpan='2' className={tableCell}>
          Price
        </th>
        <td className={tableCell}>
          {(item.unitPriceInPennies / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </td>
        <th colSpan='2' className={tableCell}>
          Market Price?
        </th>
        <td className={tableCell}>{(item.isMarketPrice && 'Yes') || 'No'}</td>
      </tr>
      <tr>
        <td />
        <th colSpan='2' className={tableCell}>
          Quantity on hand
        </th>
        <td className={tableCell}>{item.quantityOnHand}</td>
      </tr>
      <tr>
        <td />
        <th colSpan='2' className={tableCell}>
          Quantity Received
        </th>
        <td className={tableCell}>{item.quantityReceived}</td>
      </tr>
      <tr>
        <td />
        <th colSpan='2' className={tableCell}>
          Item Note
        </th>
        <td colSpan='5' className={tableCell}>
          {item.itemNote}
        </td>
      </tr>
      <tr>
        <td />
        <th colSpan='2' className={tableCell}>
          Special Note
        </th>
        <td colSpan='5' className={tableCell}>
          {item.specialNote}
        </td>
      </tr>
      <tr>
        <td />
        <th colSpan='2' className={tableCell}>
          Receiving Note
        </th>
        <td colSpan='5' className={tableCell}>
          {item.receivingNote}
        </td>
      </tr>
      <tr>
        <td className='h-3' />
      </tr>
    </>
  )
}
export default EditItemForm

const tableCell = 'border border-gray-700 text-center'

const whatIdontwantasinput =
  'bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-2 mb-1 w-32'
