import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { EDIT_ITEM } from '../../Queries/item'

const EditItemWindow = ({ item, active, setActive }) => {
  const [edit] = useMutation(EDIT_ITEM)
  const [editItemForm, setEditItemForm] = useState({
    id: item.id,
    specialNote: item.specialNote,
    isMarketPrice: item.isMarketPrice,
  })

  const handleSubmit = () => {
    edit({
      variables: {
        id: editItemForm.id,
        input: {
          specialNote: editItemForm.specialNote,
          isMarketPrice: editItemForm.isMarketPrice,
        },
      },
    })
    setActive(false)
  }

  const handleChangeInput = (event) => {
    setEditItemForm({
      ...editItemForm,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div
      className={`fixed inset-0 w-full h-screen flex items-center justify-center bg-opacity-75 bg-black`}
    >
      <div className='w-11/12 bg-gray-200 shadow-lg rounded-lg p-6 flex flex-col items-center'>
        <span className='text-lg py-3'>{item.itemName}</span>
        <span className='text-gray-700 py-3'>Special Note</span>
        <div className='w-10/12 p-2 bg-white'>
          <textarea
            className='w-full justify-between resize-none outline-none'
            name='specialNote'
            value={editItemForm.specialNote}
            onChange={handleChangeInput}
          />
        </div>
        <div className='p-4 flex w-10/12 justify-between pt-10'>
          <button
            className='border border-2 rounded w-24 bg-green-100 p-2 border-green-600 text-green-700'
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            className='border border-2 rounded w-24 bg-gray-100 p-2 border-gray-600 text-gray-700'
            onClick={() => setActive(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
export default EditItemWindow
