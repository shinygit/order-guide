import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Modal from 'react-modal'
import useLongPress from '../../../hooks/useLongPress'

const TOGGLE_FLAGGED_BY_RECEIVER = gql`
  mutation toggleFlaggedByReceiver(
    $id: ID!
    $flaggedByReceiver: String
    $receiverNote: String
  ) {
    toggleFlaggedByReceiver(
      id: $id
      flaggedByReceiver: $flaggedByReceiver
      receiverNote: $receiverNote
    ) {
      id
      itemName
      orderAmount
      supplier
      quantityReceived
      receivingNote
      flaggedByReceiver
      receiverNote
    }
  }
`
const ReceiverFlaggedToggle = ({ item, me, confirmIfReceivedSubmitted }) => {
  Modal.setAppElement('#root')
  const [toggleFlaggedByReceiver] = useMutation(TOGGLE_FLAGGED_BY_RECEIVER)
  const [receiverNoteForm, setReceiverNoteForm] = useState(
    item.receiverNote || ''
  )
  const [modalIsOpen, setIsOpen] = useState(false)

  const longPressProps = useLongPress({
    ms: 500,
    onLongPress: () =>
      confirmIfReceivedSubmitted(() => {
        toggleFlaggedByReceiver({
          variables: {
            id: item.id,
            flaggedByReceiver: null,
            receiverNote: null,
          },
        })
        setReceiverNoteForm('')
      }),
    onClick: () => confirmIfReceivedSubmitted(handleToggleFlaggedByReceiver),
  })
  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }
  function save() {
    setIsOpen(false)
    toggleFlaggedByReceiver({
      variables: {
        id: item.id,
        flaggedByReceiver: me.receiverName || 'You',
        receiverNote: receiverNoteForm,
      },
    })
  }
  const handleToggleFlaggedByReceiver = () => {
    openModal()
  }
  const handleChangeInput = (event) => {
    setReceiverNoteForm(event.target.value)
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        contentLabel='Receiver Note'
        overlayClassName='fixed inset-0 w-full h-screen flex items-center justify-center bg-opacity-75 bg-black'
        className='w-11/12 bg-gray-200 shadow-lg rounded-lg p-6 flex flex-col items-center'
      >
        <span className='text-lg py-3'>{item.itemName}</span>
        <span className='text-gray-700 py-3'>Receiver Note</span>
        <div className='w-10/12 p-2 bg-white'>
          <textarea
            className='w-full justify-between resize-none outline-none'
            name='receiverNoteForm'
            value={receiverNoteForm}
            onChange={handleChangeInput}
          />
        </div>
        <div className='p-4 flex w-10/12 justify-between pt-10'>
          <button
            className='border border-2 rounded w-24 bg-green-100 p-2 border-green-600 text-green-700'
            onClick={save}
          >
            Save
          </button>
          <button
            className='border border-2 rounded w-24 bg-gray-100 p-2 border-gray-600 text-gray-700'
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
        <span className='text-xs text-gray-500'>
          long press the alert symbol to clear note and flagged
        </span>
      </Modal>
      {item.flaggedByReceiver ? (
        <svg
          {...longPressProps}
          xmlns='http://www.w3.org/2000/svg'
          width='30'
          height='30'
          viewBox='0 0 20 20'
          className='fill-current text-red-500 m-auto'
        >
          <path d='M19.64 16.36L11.53 2.3A1.85 1.85 0 0010 1.21 1.85 1.85 0 008.48 2.3L.36 16.36C-.48 17.81.21 19 1.88 19h16.24c1.67 0 2.36-1.19 1.52-2.64zM11 16H9v-2h2zm0-4H9V6h2z' />
        </svg>
      ) : (
        <svg
          {...longPressProps}
          xmlns='http://www.w3.org/2000/svg'
          width='30'
          height='30'
          viewBox='0 0 20 20'
          className='fill-current text-gray-400 m-auto'
        >
          <path d='M19.64 16.36L11.53 2.3A1.85 1.85 0 0010 1.21 1.85 1.85 0 008.48 2.3L.36 16.36C-.48 17.81.21 19 1.88 19h16.24c1.67 0 2.36-1.19 1.52-2.64zM11 16H9v-2h2zm0-4H9V6h2z' />
        </svg>
      )}
    </div>
  )
}

export default ReceiverFlaggedToggle
