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
  if (active)
    return (
      <td className='fixed w-7/12 h-auto inset-0 p-8 bg-white m-auto flex-col flex'>
        <textarea
          name='specialNote'
          value={editItemForm.specialNote}
          onChange={handleChangeInput}
        />
        <button onClick={handleSubmit}>Save</button>
        <button onClick={() => setActive(false)}>Cancel</button>
      </td>
    )
  return null
}
export default EditItemWindow
