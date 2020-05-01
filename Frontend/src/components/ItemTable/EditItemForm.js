import React, { useState, useEffect } from 'react'
import ChangeOrderAmount from './ChangeOrderAmount'
import { EDIT_ITEM, DELETE_ITEM, GET_LATEST_ORDER } from '../../Queries/item'
import { useMutation } from '@apollo/react-hooks'
import { produce } from 'immer'

const parseToEmptyString = value => {
  if (value !== 0 && !value) return ''
  return value
}

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

  const handleChangePriceInput = event => {
    setEditItemForm({
      ...editItemForm,
      unitPriceInPennies: event.target.value * 100
    })
  }

  const handleToggleMarketPrice = () => {
    setEditItemForm({
      ...editItemForm,
      isMarketPrice: !editItemForm.isMarketPrice
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
          unitPriceInPennies: parseInt(editItemForm.unitPriceInPennies),
          isMarketPrice: !!editItemForm.isMarketPrice,
          quantityOnHand: parseInt(editItemForm.quantityOnHand),
          quantityReceived: parseInt(editItemForm.quantityReceived),
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
        <td />
        <td className={tableCell}>
          <input
            className={`${editInput} w-full`}
            type='text'
            name='itemName'
            value={editItemForm.itemName}
            onChange={handleChangeinput}
          />
        </td>
        <td className={tableCell}>
          <input
            className={`${editInput} w-12`}
            type='number'
            name='buildTo'
            value={parseToEmptyString(editItemForm.buildTo)}
            onChange={handleChangeinput}
          />
        </td>
        <td className={tableCell}>{item.previousOrders[1]}</td>
        <td className={tableCell}>{item.previousOrders[0]}</td>
        <td className={tableCell}>
          <ChangeOrderAmount id={item.id} orderAmount={item.orderAmount} />
        </td>
        <td className={tableCell}>
          <input
            className={`${editInput} w-full`}
            type='text'
            name='supplier'
            list='suppliersList'
            value={parseToEmptyString(editItemForm.supplier)}
            onChange={handleChangeinput}
          />
          <datalist id='suppliersList'>
            {suppliers.map(item => (
              <option key={item} value={item} />
            ))}
          </datalist>
        </td>
        <td className={tableCell}>
          <input
            className={`${editInput} w-full`}
            type='text'
            name='location'
            list='locationsList'
            value={parseToEmptyString(editItemForm.location)}
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
            Canc
          </button>
        </td>
        <th colSpan='2' className={tableCell}>
          Product Number
        </th>
        <td colSpan='2' className={tableCell}>
          <input
            className={`${editInput} w-full`}
            type='text'
            name='productNumber'
            value={parseToEmptyString(editItemForm.productNumber)}
            onChange={handleChangeinput}
          />
        </td>
      </tr>
      <tr>
        <td>
          <button onClick={handleSubmit}>Save</button>
        </td>
        <th colSpan='2' className={tableCell}>
          Unit Size
        </th>
        <td className={tableCell}>
          <input
            className={`${editInput} w-full`}
            type='text'
            name='unitSize'
            value={parseToEmptyString(editItemForm.unitSize)}
            onChange={handleChangeinput}
          />
        </td>
      </tr>
      <tr>
        <td />
        <th colSpan='2' className={tableCell}>
          Price
        </th>
        <td className={tableCell}>
          $
          <input
            className={`${editInput} w-24`}
            type='number'
            name='unitPriceInPennies'
            value={parseToEmptyString(editItemForm.unitPriceInPennies) / 100}
            onChange={handleChangePriceInput}
          />
        </td>
        <th colSpan='2' className={tableCell}>
          Market Price?
        </th>
        <td className={tableCell}>
          <button
            className={`${editInput} w-12`}
            onClick={handleToggleMarketPrice}
          >
            {(editItemForm.isMarketPrice && 'Yes') || 'No'}
          </button>
        </td>
      </tr>
      <tr>
        <td>
          <button
            onClick={() => {
              handleDelete(item.id, item.itemName)
            }}
          >
            Del
          </button>
        </td>
        <th colSpan='2' className={tableCell}>
          Quantity on hand
        </th>
        <td className={tableCell}>
          <input
            className={`${editInput} w-12`}
            type='text'
            name='quantityOnHand'
            value={parseToEmptyString(editItemForm.quantityOnHand)}
            onChange={handleChangeinput}
          />
        </td>
      </tr>
      <tr>
        <td />
        <th colSpan='2' className={tableCell}>
          Quantity Received
        </th>
        <td className={tableCell}>
          <input
            className={`${editInput} w-12`}
            type='text'
            name='quantityReceived'
            value={parseToEmptyString(editItemForm.quantityReceived)}
            onChange={handleChangeinput}
          />
        </td>
      </tr>
      <tr>
        <td />
        <th colSpan='2' className={tableCell}>
          Item Note
        </th>
        <td colSpan='5' className={tableCell}>
          <textarea
            className={`${editInput} w-full`}
            name='itemNote'
            value={parseToEmptyString(editItemForm.itemNote)}
            onChange={handleChangeinput}
          />
        </td>
      </tr>
      <tr>
        <td />
        <th colSpan='2' className={tableCell}>
          Special Note
        </th>
        <td colSpan='5' className={tableCell}>
          <textarea
            className={`${editInput} w-full`}
            name='specialNote'
            value={parseToEmptyString(editItemForm.specialNote)}
            onChange={handleChangeinput}
          />
        </td>
      </tr>
      <tr>
        <td />
        <th colSpan='2' className={tableCell}>
          Receiving Note
        </th>
        <td colSpan='5' className={tableCell}>
          <textarea
            className={`${editInput} w-full`}
            name='receivingNote'
            value={parseToEmptyString(editItemForm.receivingNote)}
            onChange={handleChangeinput}
          />
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
const editInput = 'bg-gray-200 border border-gray-700'

const whatIdontwantasinput =
  'bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-2 mb-1 w-32'
