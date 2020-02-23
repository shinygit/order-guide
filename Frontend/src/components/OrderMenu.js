import React, { useState } from 'react'

import moment from 'moment'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_NEW_ORDER_DATE, DELETE_ORDER_DATE } from '../Queries/order'

const OrderMenu = ({ setCurrentDate, currentDate }) => {
  const [createNewOrder] = useMutation(CREATE_NEW_ORDER_DATE)
  const [deleteOrder] = useMutation(DELETE_ORDER_DATE)
  const [orderDateForm, setOrderDateForm] = useState('')
  const handleChangeInput = event => {
    setOrderDateForm(event.target.value)
  }
  const handleSubmit = async event => {
    event.preventDefault()
    await createNewOrder({
      variables: { orderDate: orderDateForm }
    })
    setCurrentDate('')
    setOrderDateForm('')
  }
  const deleteOrderDate = async () => {
    await deleteOrder({ variables: { orderDate: currentDate } })
    setCurrentDate('')
  }
  return (
    <div>
      <h1>Current order date: {moment.utc(currentDate).format('L')}</h1>
      <button onClick={deleteOrderDate}>Delete this order</button>
      <form onSubmit={handleSubmit}>
        <label>
          New order date:
          <input
            type='date'
            name='orderDate'
            value={orderDateForm}
            onChange={handleChangeInput}
          />
        </label>
        <button type='submit'>Create new order date.</button>
      </form>
    </div>
  )
}

export default OrderMenu
