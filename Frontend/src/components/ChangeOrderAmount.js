import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_ITEM_ORDER_AMOUNT } from '../Queries/item'

const ChangeOrderAmount = ({ id, orderAmount }) => {
  const getNextOrderAmount = orderAmount => {
    if (orderAmount === null) {
      return 0
    } else return orderAmount + 1
  }
  const [updateItemOrderAmount] = useMutation(UPDATE_ITEM_ORDER_AMOUNT)
  const handleDecrease = () => {
    updateItemOrderAmount({
      variables: {
        id: id,
        orderAmount: orderAmount - 1
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateItemOrderAmount: {
          __typename: 'Item',
          id: id,
          orderAmount: orderAmount - 1
        }
      }
    })
  }
  const handleIncrease = () => {
    updateItemOrderAmount({
      variables: {
        id: id,
        orderAmount: getNextOrderAmount(orderAmount)
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateItemOrderAmount: {
          __typename: 'Item',
          id: id,
          orderAmount: getNextOrderAmount(orderAmount)
        }
      }
    })
  }

  return (
    <>
      <button onClick={() => handleDecrease()} />

      {orderAmount}
      <button onClick={() => handleIncrease()} />
    </>
  )
}
export default ChangeOrderAmount
