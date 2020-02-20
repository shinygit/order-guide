import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_ITEM_ORDER_AMOUNT } from '../Queries/item'

const ChangeOrderAmount = ({ id, orderAmount }) => {
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
        orderAmount: orderAmount + 1
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateItemOrderAmount: {
          __typename: 'Item',
          id: id,
          orderAmount: orderAmount + 1
        }
      }
    })
  }

  return (
    <>
      <button onClick={() => handleDecrease()}>-</button>
      {orderAmount}
      <button onClick={() => handleIncrease()}>+</button>
    </>
  )
}
export default ChangeOrderAmount
