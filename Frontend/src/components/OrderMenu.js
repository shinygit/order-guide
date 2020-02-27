import React, { useState } from 'react'

import moment from 'moment'

import { useMutation } from '@apollo/react-hooks'
import { CREATE_NEW_ORDER_DATE, DELETE_ORDER_DATE } from '../Queries/order'

import styled from 'styled-components'

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
    <Div>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>New order date:</Label>{' '}
        </div>
        <div>
          <Input
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
            <ErrorMessage onClick={() => setErrorMessage()}>
              {error && errorMessage}
            </ErrorMessage>
          )}
        </div>

        <div>
          <Button type='submit'>Create new order</Button>
        </div>
      </Form>
      <Span>Current order date: {moment.utc(currentDate).format('L')}</Span>
      <Button onClick={deleteOrderDate}>Delete this order</Button>
    </Div>
  )
}
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 10px 0px 10px 0px;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
const Label = styled.label`
  font-size: 5vw;
`
const Input = styled.input``
const Span = styled.span`
  margin: 5px 0px 0px 0px;
  font-size: 7.5vw;
`
const ErrorMessage = styled(Label)`
  display: inline-block;
  font-size: 1em;
  vertical-align: middle;
  color: #d8000c;
  background-color: #ffd2d2;
  margin: 5px 2px;
  padding: 5px;
`
const Button = styled.button``
export default OrderMenu
