import React, { useState } from 'react'

import moment from 'moment'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_NEW_ORDER_DATE, DELETE_ORDER_DATE } from '../Queries/order'
import OrderNote from './OrderNote'

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
    <div className='grid justify-between grid-cols-2 mb-10 md:flex'>
      <form className='flex flex-col w-56' onSubmit={handleSubmit}>
        <label className=''>new order date</label>{' '}
        <input
          className='w-48 px-4 py-2 mb-1 bg-white border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline'
          type='date'
          name='orderDate'
          value={orderDateForm}
          onChange={handleChangeInput}
          required
        />
        <div>
          {error && errorMessage && (
            <div
              className='font-bold text-red-700 bg-red-200 border-2 border-red-800'
              onClick={() => setErrorMessage()}
            >
              {error && errorMessage}
            </div>
          )}
        </div>
        <button
          className='w-48 p-2 bg-gray-100 border border-gray-900 rounded'
          type='submit'
        >
          Create new order
        </button>
      </form>
      <div className='flex-1 order-last col-span-2 p-2 mx-10 mt-5 bg-yellow-100 md:order-none'>
        <OrderNote />
      </div>
      <div className='flex flex-col'>
        <span className='ml-auto'>Week of</span>
        <span className='ml-auto text-2xl font-semibold'>
          {moment.utc(currentDate).format('L')}
        </span>
        <div>
          {deleteError && deleteErrorMessage && (
            <div
              className='font-bold text-red-700 bg-red-200 border-2 border-red-800'
              onClick={() => setDeleteErrorMessage()}
            >
              {deleteError && deleteErrorMessage}
            </div>
          )}
        </div>
        <button
          className='w-auto p-2 ml-auto bg-gray-100 border border-gray-900 rounded'
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
              className='w-auto p-2 ml-auto bg-gray-100 border border-gray-900 rounded'
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
