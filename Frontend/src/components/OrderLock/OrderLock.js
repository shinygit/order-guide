import React from 'react'
import { ReactComponent as LockedIcon } from './icon-114-lock.svg'
import { ReactComponent as UnLockedIcon } from './icon-115-lock-open.svg'
import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { ORDER_DATES } from '../../Queries/order'

const TOGGLE_ORDER_LOCK = gql`
  mutation toggleOrderLock($orderDate: String!) {
    toggleOrderLock(orderDate: $orderDate) {
      id
      orderDate
      isLocked
    }
  }
`

const OrderLock = () => {
  const [toggleOrderLock] = useMutation(TOGGLE_ORDER_LOCK)
  const { data } = useQuery(ORDER_DATES, {
    variables: {
      orderDepth: 1,
    },
  })
  const handleToggleOrderLock = () => {
    if (data) {
      if (data.orders[0].isLocked) {
        if (window.confirm('Are you sure you wish to unlock this order?')) {
          toggleOrderLock({
            variables: { orderDate: data.orders[0].orderDate },
          })
        }
      } else {
        toggleOrderLock({
          variables: { orderDate: data.orders[0].orderDate },
        })
      }
    }
  }
  return (
    <div onClick={handleToggleOrderLock}>
      {data?.orders[0].isLocked ? <LockedIcon /> : <UnLockedIcon />}
    </div>
  )
}
export default OrderLock
