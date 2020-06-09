import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Modal from 'react-modal'
import AddItemForm from './AddItemForm'

Modal.setAppElement('#root')

const AddItemButton = ({ locations }) => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({})

  function openModal() {
    setIsOpen(true)
    const rect = document
      .getElementById('add-item-button')
      .getBoundingClientRect()
    setPosition({ top: rect.top - rect.height / 2, left: rect.left })
  }
  function adjustPosition() {
    const rect = document
      .getElementById('add-item-button')
      .getBoundingClientRect()
    const rect2 = document
      .getElementById('add-item-form')
      .getBoundingClientRect()
    setPosition({
      top: rect.top - rect.height / 2,
      left: rect.left - rect2.width,
    })
  }
  function closeModal() {
    setIsOpen(false)
  }
  function save() {
    setIsOpen(false)
  }
  const handleAddItemButtonClick = () => {
    openModal()
  }
  const handleChangeInput = (event) => {}

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        contentLabel='Add Item'
        onAfterOpen={adjustPosition}
        shouldFocusAfterRender={false}
        overlayClassName='w-full h-screen'
        className='absolute'
        style={{ content: { ...position } }}
      >
        <AddItemForm locations={locations} closeModal={closeModal} />
      </Modal>
      <button
        id='add-item-button'
        className='w-auto p-4 mx-1 border border-gray-900 rounded bg-gray-100 ml-auto'
        onClick={() => handleAddItemButtonClick()}
      >
        New Item
      </button>
    </>
  )
}
export default AddItemButton
