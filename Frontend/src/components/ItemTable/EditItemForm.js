import React, { useState, useEffect, useContext } from 'react'
import ChangeOrderAmount from './ChangeOrderAmount'
import { EDIT_ITEM, DELETE_ITEM, GET_LATEST_ORDER } from '../../Queries/item'
import { useMutation } from '@apollo/react-hooks'
import { produce } from 'immer'
import { LocSupContext } from '../../App'
import FieldSupplierSelector from './FieldSupplierSelector'
import CategorySelector from './CategorySelector'
import LastOrderedDate from './LastOrderedDate'
import AverageWeeklyUse from './AverageWeeklyUse'
const parseToEmptyString = (value) => {
  if (value !== 0 && !value) return ''
  return value
}

const EditItemForm = ({ item, handleToggleEdit }) => {
  const { locations } = useContext(LocSupContext)
  const [edit] = useMutation(EDIT_ITEM)
  const [deleteItem] = useMutation(DELETE_ITEM)
  const [editItemForm, setEditItemForm] = useState({
    id: item.id,
    itemName: item.itemName,
    buildTo: item.buildTo,
    supplier: item.supplier,
    category: item.category,
    location: item.location,
    orderAmount: item.orderAmount,
    productNumber: item.productNumber,
    unitSize: item.unitSize,
    unitPriceInPennies: item.unitPriceInPennies,
    isMarketPrice: item.isMarketPrice,
    isInfrequent: item.isInfrequent,
    quantityOnHand: item.quantityOnHand,
    quantityReceived: item.quantityReceived,
    itemNote: item.itemNote,
    specialNote: item.specialNote,
    receivingNote: item.receivingNote,
    receiverNote: item.receiverNote,
    showEditForm: item.showEditForm,
  })
  const handleChangeInput = (event) => {
    setEditItemForm({
      ...editItemForm,
      [event.target.name]: event.target.value,
    })
  }

  const handleChangePriceInput = (event) => {
    setEditItemForm({
      ...editItemForm,
      unitPriceInPennies: event.target.value * 100,
    })
  }

  const handleToggleMarketPrice = () => {
    setEditItemForm({
      ...editItemForm,
      isMarketPrice: !editItemForm.isMarketPrice,
    })
  }
  const handleToggleInfrequentItem = () => {
    setEditItemForm({
      ...editItemForm,
      isInfrequent: !editItemForm.isInfrequent,
    })
  }
  const handleDelete = (id, itemName) => {
    if (window.confirm(`Are you sure you want to delete ${itemName}`)) {
      deleteItem({
        variables: { id: id },
        update: (client) => {
          const previous = client.readQuery({
            query: GET_LATEST_ORDER,
            variables: { orderDepth: 1 },
          })
          const { items } = previous.orders[0]
          const next = produce(previous, (draft) => {
            draft.orders[0].items = items.filter((item) => item.id !== id)
          })

          client.writeQuery({
            query: GET_LATEST_ORDER,
            variables: { orderDepth: 1 },
            data: next,
          })
        },
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
          supplier: editItemForm.supplier === '' ? null : editItemForm.supplier,
          location: editItemForm.location === '' ? null : editItemForm.location,
          category: editItemForm.category === '' ? null : editItemForm.category,
          productNumber: editItemForm.productNumber,
          unitSize: editItemForm.unitSize,
          unitPriceInPennies: parseInt(editItemForm.unitPriceInPennies),
          isMarketPrice: !!editItemForm.isMarketPrice,
          quantityOnHand: parseInt(editItemForm.quantityOnHand),
          quantityReceived: parseInt(editItemForm.quantityReceived),
          itemNote: editItemForm.itemNote,
          specialNote: editItemForm.specialNote,
          receivingNote: editItemForm.receivingNote,
          receiverNote: editItemForm.receiverNote,
          isInfrequent: editItemForm.isInfrequent,
        },
      },
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
        category: item.category,
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
        receiverNote: item.receiverNote,
        isInfrequent: item.isInfrequent,
        showEditForm: false,
      }),
    [item]
  )

  return (
    <>
      <tr className='bg-gray-100'>
        <td className='bg-yellow-100' />
        <td className={tableCell}>
          <input
            className={`${editInput} w-full`}
            type='text'
            name='itemName'
            value={editItemForm.itemName}
            onChange={handleChangeInput}
          />
        </td>
        <td className={tableCell}>
          <input
            className={`${editInput} w-full`}
            type='text'
            name='unitSize'
            value={parseToEmptyString(editItemForm.unitSize)}
            onChange={handleChangeInput}
          />
        </td>
        <td className={`${tableCell} hidden md:table-cell`}>
          <input
            className={`${editInput} w-full`}
            type='text'
            name='productNumber'
            value={parseToEmptyString(editItemForm.productNumber)}
            onChange={handleChangeInput}
          />
        </td>
        <td className={tableCell}>
          <input
            className={`${editInput} w-12`}
            type='number'
            name='buildTo'
            value={parseToEmptyString(editItemForm.buildTo)}
            onChange={handleChangeInput}
          />
        </td>
        <td className={`${tableCell} hidden lg:table-cell`}>
          {item.previousOrders[1]}
        </td>
        <td className={tableCell}>{item.previousOrders[0]}</td>
        <td className={tableCell}>
          <ChangeOrderAmount id={item.id} />
        </td>
        <td className={tableCell}>
          <FieldSupplierSelector
            handleChangeInput={handleChangeInput}
            currentSupplierSelection={editItemForm.supplier}
          />
        </td>
        <td className={tableCell}>
          <input
            className={`${editInput} w-full`}
            type='text'
            name='location'
            list='locationsList'
            value={parseToEmptyString(editItemForm.location)}
            onChange={handleChangeInput}
          />
          <datalist id='locationsList'>
            {locations.map((item) => (
              <option key={item} value={item} />
            ))}
          </datalist>
        </td>
        <td />
      </tr>
      <tr className='bg-gray-100'>
        <td className='text-right bg-yellow-100'>
          <button onClick={handleSubmit}>Save</button>
        </td>
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
            data-cy='toggleMarketPriceButton'
          >
            {(editItemForm.isMarketPrice && 'Yes') || 'No'}
          </button>
        </td>
        <td className='hidden lg:table-cell'></td>
        <th className={tableCell}>Category</th>
        <td className={tableCell}>
          <CategorySelector
            handleChangeInput={handleChangeInput}
            currentCategorySelection={editItemForm.category}
          />
        </td>
      </tr>
      <tr className='bg-gray-100'>
        <td className='bg-yellow-100' />
        <th colSpan='2' className={tableCell}>
          Quantity on hand
        </th>
        <td className={tableCell}>
          <input
            className={`${editInput} w-12`}
            type='number'
            name='quantityOnHand'
            value={parseToEmptyString(editItemForm.quantityOnHand)}
            onChange={handleChangeInput}
          />
        </td>
        <th colSpan='2' className={tableCell}>
          Infrequent Item?
        </th>
        <td className={tableCell}>
          <button
            className={`${editInput} w-12`}
            onClick={handleToggleInfrequentItem}
            data-cy='toggleInfrequentItemButton'
          >
            {(editItemForm.isInfrequent && 'Yes') || 'No'}
          </button>
        </td>
      </tr>
      <tr className='bg-gray-100'>
        <td className='text-right bg-yellow-100'>
          <button
            onClick={() => {
              handleToggleEdit(item.id)
            }}
          >
            Canc
          </button>
        </td>
        <th colSpan='2' className={tableCell}>
          Quantity Received
        </th>
        <td className={tableCell}>
          <input
            className={`${editInput} w-12`}
            type='number'
            name='quantityReceived'
            value={parseToEmptyString(editItemForm.quantityReceived)}
            onChange={handleChangeInput}
          />
        </td>
        <th colSpan='2' className={tableCell}>
          Last Ordered
        </th>
        <td className={tableCell}>
          <LastOrderedDate itemId={item.id} />
        </td>
        <th colSpan='1' className={tableCell}>
          Average Weekly Use
        </th>
        <td className={tableCell}>
          <AverageWeeklyUse itemId={item.id} />
        </td>
      </tr>
      <tr className='bg-gray-100'>
        <td className='bg-yellow-100' />
        <th colSpan='2' className={tableCell}>
          Item Note
        </th>
        <td colSpan='5' className={tableCell}>
          <textarea
            className={`${editInput} w-full`}
            name='itemNote'
            value={parseToEmptyString(editItemForm.itemNote)}
            onChange={handleChangeInput}
          />
        </td>
      </tr>
      <tr className='bg-gray-100'>
        <td className='text-right bg-yellow-100'>
          <button
            onClick={() => {
              handleDelete(item.id, item.itemName)
            }}
          >
            Del
          </button>
        </td>
        <th colSpan='2' className={tableCell}>
          Special Note
        </th>
        <td colSpan='5' className={tableCell}>
          <textarea
            className={`${editInput} w-full`}
            name='specialNote'
            value={parseToEmptyString(editItemForm.specialNote)}
            onChange={handleChangeInput}
          />
        </td>
      </tr>
      <tr className='bg-gray-100'>
        <td className='bg-yellow-100' />
        <th colSpan='2' className={tableCell}>
          Receiving Note
        </th>
        <td colSpan='5' className={tableCell}>
          <textarea
            className={`${editInput} w-full`}
            name='receivingNote'
            value={parseToEmptyString(editItemForm.receivingNote)}
            onChange={handleChangeInput}
          />
        </td>
      </tr>
      <tr className='bg-gray-100'>
        <td className='bg-yellow-100' />
        <th colSpan='2' className={tableCell}>
          Receiver Note
        </th>
        <td colSpan='5' className={tableCell}>
          <textarea
            className={`${editInput} w-full`}
            name='receiverNote'
            value={parseToEmptyString(editItemForm.receiverNote)}
            onChange={handleChangeInput}
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
