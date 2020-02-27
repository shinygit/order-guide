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
        variables: { orderDate: orderDateForm }
      })
      setCurrentDate('')
      setOrderDateForm('')
    } catch (error) {
      setErrorMessage(error.message.split('GraphQL error: ')[1])
    }
  }
  const deleteOrderDate = async () => {
    await deleteOrder({ variables: { orderDate: currentDate } })
    setCurrentDate('')
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>New order date:</label>{' '}
        </div>
        <div>
          <input
            type='date'
            name='orderDate'
            value={orderDateForm}
            onChange={handleChangeInput}
            error={error}
            required
          />
        </div>
        <div>
          {error && errorMessage && (
            <div onClick={() => setErrorMessage()}>{error && errorMessage}</div>
          )}
        </div>

        <div>
          <button type='submit'>Create new order</button>
        </div>
      </form>
      <span>Current order date: {moment.utc(currentDate).format('L')}</span>
      <button onClick={deleteOrderDate}>Delete this order</button>
    </div>
  )
}
export default OrderMenu
