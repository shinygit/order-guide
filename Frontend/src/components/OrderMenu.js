import React, { useState } from 'react'

import moment from 'moment'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_NEW_ORDER_DATE, DELETE_ORDER_DATE } from '../Queries/order'

const OrderMenu = ({ setCurrentDate, currentDate }) => {
  const [createNewOrder, { error }] = useMutation(CREATE_NEW_ORDER_DATE)
  const [deleteOrder] = useMutation(DELETE_ORDER_DATE)
  const [orderDateForm, setOrderDateForm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const handleChangeInput = event => {
    setOrderDateForm(event.target.value)
  }
  const handleSubmit = async event => {
    event.preventDefault()
    try {
      await createNewOrder({
        variables: { orderDate: orderDateForm },
        refetchQueries: ['orderDates']
      })
      setCurrentDate('0000-00-00')
      setOrderDateForm('')
    } catch (error) {
      setErrorMessage(error.message.split('GraphQL error: ')[1])
    }
  }
  const [deleteConfirmCount, setDeleteConfirmCount] = useState(0)
  const deleteOrderDate = async () => {
    if (deleteConfirmCount === 3) {
      await deleteOrder({
        variables: { orderDate: currentDate },
        refetchQueries: ['orderDates']
      })
      setDeleteConfirmCount(0)
      setCurrentDate('')
    } else {
      if (currentDate) {
        setDeleteConfirmCount(deleteConfirmCount + 1)
      }
    }
  }
  const cancelDelete = () => {
    setDeleteConfirmCount(0)
  }
  return (
    <div className='flex justify-between mb-10'>
      <form className='flex flex-col w-56' onSubmit={handleSubmit}>
        <label className='font-semibold text-xl'>New order date:</label>{' '}
        <input
          className='bg-white focus:outline-none
        focus:shadow-outline border border-gray-300
         rounded-lg py-2 px-4 mb-1 w-48'
          type='date'
          name='orderDate'
          value={orderDateForm}
          onChange={handleChangeInput}
          required
        />
        <div>
          {error && errorMessage && (
            <div
              className='bg-red-200 text-red-700 font-bold border-2 border-red-800'
              onClick={() => setErrorMessage()}
            >
              {error && errorMessage}
            </div>
          )}
        </div>
        <button
          className='w-48 p-2 border border-gray-900 rounded bg-gray-100'
          type='submit'
        >
          Create new order
        </button>
      </form>
      <div className='flex flex-col'>
        <span className='font-semibold text-2xl'>
          Current order date: {moment.utc(currentDate).format('L')}
        </span>
        <button
          className='w-auto p-2 border border-gray-900 rounded bg-gray-100 ml-auto'
          onClick={deleteOrderDate}
        >
          Delete this order
        </button>
        {!!deleteConfirmCount && (
          <>
            <span className='ml-auto text-red-600'>
              Click {4 - deleteConfirmCount} more times to delete.
            </span>
            <button
              className='w-auto p-2 border border-gray-900 rounded bg-gray-100 ml-auto'
              onClick={cancelDelete}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  )
}
export default OrderMenu
