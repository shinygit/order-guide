import React, { useState, useEffect, useRef } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { GET_LATEST_ORDER } from '../Queries/item'
import TextareaAutosize from 'react-textarea-autosize'

const EDIT_ORDER_NOTE = gql`
  mutation updateOrderNote($orderId: ID!, $note: String!) {
    updateOrderNote(orderId: $orderId, note: $note) {
      id
      note
    }
  }
`
const OrderNote = ({}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [orderNoteValue, setOrderNoteValue] = useState('')

  const inputRef = useRef(null)

  const { loading, data: orderData, refetch } = useQuery(GET_LATEST_ORDER, {
    variables: { orderDepth: 1 },
    notifyOnNetworkStatusChange: true,
  })
  useEffect(() => {
    if (orderData?.orders?.[0]) {
      setOrderNoteValue(orderData.orders[0].note)
    }
  }, [orderData])
  const [editOrderNote, { data }] = useMutation(EDIT_ORDER_NOTE)

  const handleSaveClick = () => {
    editOrderNote({
      variables: {
        orderId: orderData.orders[0].id,
        note: orderNoteValue,
      },
    })
    setIsEditing(false)
  }
  const handleEditClick = () => {
    setIsEditing(true)
  }

  useEffect(() => {
    if (isEditing === true) {
      inputRef.current.focus()
      inputRef.current.selectionStart = inputRef.current.value.length
      inputRef.current.selectionEnd = inputRef.current.value.length
    }
  }, [isEditing])

  if (isEditing) {
    return (
      <div className='w-full'>
        <div className='flex'>
          <button className={buttonStyle} onClick={handleSaveClick}>
            Save
          </button>
          <span className='text-xl'>Order Notes</span>
        </div>
        <TextareaAutosize
          ref={inputRef}
          className='w-full mt-3'
          value={orderNoteValue}
          onChange={(e) => setOrderNoteValue(e.target.value)}
        />
      </div>
    )
  }

  if (!orderData.orders[0].note) {
    return (
      <button
        className={`${buttonStyle} self-center`}
        onClick={handleEditClick}
      >
        Add Order Notes
      </button>
    )
  }

  if (!isEditing) {
    return (
      <div className='w-full whitespace-pre-wrap'>
        <div className='flex'>
          <button className={buttonStyle} onClick={handleEditClick}>
            Edit
          </button>
          <span className='text-xl'>Order Notes</span>
        </div>
        <div className='mt-3'>{orderData.orders[0].note}</div>
      </div>
    )
  }
}

export default OrderNote

const buttonStyle = 'border border-black rounded bg-gray-100 px-1 shadow mr-10'
