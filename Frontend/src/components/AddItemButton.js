import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Modal from 'react-modal'
import AddItemForm from './AddItemForm'

Modal.setAppElement('#root')

const AddItemButton = ({ locations }) => {
  const [formIsOpen, setFormIsOpen] = useState(false)

  return (
    <div className='ml-auto relative'>
      <button
        id='add-item-button'
        className='w-auto p-4 mx-1 border border-gray-900 rounded bg-gray-100 ml-auto'
        onClick={() => setFormIsOpen(true)}
      >
        New Item
      </button>
      {formIsOpen && (
        <AddItemForm
          locations={locations}
          setFormIsOpen={setFormIsOpen}
          formIsOpen={formIsOpen}
        />
      )}
    </div>
  )
}
export default AddItemButton
