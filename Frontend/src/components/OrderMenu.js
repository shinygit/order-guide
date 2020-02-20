import React, { useState } from 'react'

import moment from 'moment'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_NEW_ORDER_DATE } from '../Queries/order'

const OrderMenu = ({ setCurrentDate, currentDate }) => {
  const [newOrder] = useMutation(CREATE_NEW_ORDER_DATE)
  const [orderDateForm, setOrderDateForm] = useState('')

  const handleChangeInput = event => {
    setOrderDateForm(event.target.value)
  }
  const handleSubmit = async event => {
    console.log(orderDateForm)
    await newOrder({ variables: { orderDate: orderDateForm } })
    setCurrentDate('')
    setOrderDateForm('')
    event.preventDefault()
  }
  const deleteOrderDate = async () => {
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
