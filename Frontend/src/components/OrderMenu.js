import React, { useState } from 'react'

import moment from 'moment'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_NEW_ORDER_DATE, DELETE_ORDER_DATE } from '../Queries/order'

const OrderMenu = ({ setCurrentDate, currentDate, refetch }) => {
  const [createNewOrder, { error }] = useMutation(CREATE_NEW_ORDER_DATE)
  const [deleteOrder, { error: deleteError }] = useMutation(DELETE_ORDER_DATE)
  const [orderDateForm, setOrderDateForm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('')

  const handleChangeInput = (event) => {
    setOrderDateForm(event.target.value)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await createNewOrder({
        variables: { orderDate: orderDateForm },
        refetchQueries: ['orderDates'],
      })
      window.location.reload(true)
    } catch (error) {
      setErrorMessage(error.message.split('GraphQL error: ')[1])
    }
  }
  const [deleteConfirmCount, setDeleteConfirmCount] = useState(0)
  const deleteOrderDate = async () => {
    if (deleteConfirmCount === 3) {
      if (
        window.confirm(
          'Are you sure you wish to delete this order? This is unrecoverable and you will lose any items, notes, etc you have added since your last order!'
        )
      ) {
        try {
          await deleteOrder({
            variables: { orderDate: currentDate },
            refetchQueries: ['orderDates'],
          })
          setDeleteConfirmCount(0)
          setCurrentDate('')
        } catch (error) {
          setDeleteErrorMessage(error.message.split('GraphQL error: ')[1])
          setDeleteConfirmCount(0)
        }
      }
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
        <label className=''>new order date</label>{' '}
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
        <span>Week of</span>
        <span className='font-semibold text-2xl'>
          {moment.utc(currentDate).format('L')}
        </span>
        <div>
          {deleteError && deleteErrorMessage && (
            <div
              className='bg-red-200 text-red-700 font-bold border-2 border-red-800'
              onClick={() => setDeleteErrorMessage()}
            >
              {deleteError && deleteErrorMessage}
            </div>
          )}
        </div>
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
