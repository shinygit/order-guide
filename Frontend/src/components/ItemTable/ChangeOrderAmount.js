import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_ITEM_ORDER_AMOUNT } from '../../Queries/item'

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
      <button className='align-middle' onClick={() => handleDecrease()}>
        <svg
          className='h-6 w-6'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
        >
          <path d='M19 13H5v-2h14v2z' />
        </svg>
      </button>

      <span className='text-xl'>{orderAmount}</span>
      <button className='align-middle' onClick={() => handleIncrease()}>
        <svg
          className='h-6 w-6'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
        >
          <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' />
        </svg>
      </button>
    </>
  )
}
export default ChangeOrderAmount
