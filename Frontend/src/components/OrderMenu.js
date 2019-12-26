import React, { useState } from 'react'
import api from '../api'
import moment from 'moment'

const OrderMenu = ({ setCurrentDate, currentDate }) => {
  const [orderDateForm, setOrderDateForm] = useState('')

  const handleChangeInput = event => {
    setOrderDateForm(event.target.value)
  }
  const handleSubmit = async event => {
    await api.createNewOrderDate(orderDateForm)
    setCurrentDate('')
    setOrderDateForm('')
    event.preventDefault()
  }
  const deleteOrderDate = async () => {
    await api.deleteManyItemsByDate(currentDate)
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
            name='itemName'
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
