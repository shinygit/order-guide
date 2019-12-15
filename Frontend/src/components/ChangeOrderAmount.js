import React, { useRef, useEffect } from 'react'
import api from '../api/'

const ChangeOrderAmount = ({ _id, orderAmount, dispatchItems }) => {
  const changed = useRef(false)
  const handleDecrease = () => {
    dispatchItems({ type: 'DECREASE_ORDER_AMOUNT', _id: _id })
    changed.current = true
  }
  const handleIncrease = () => {
    dispatchItems({ type: 'INCREASE_ORDER_AMOUNT', _id: _id })
    changed.current = true
  }
  useEffect(() => {
    if (changed.current) {
      api
        .updateItemById(_id, { order: orderAmount })
        .then(res => console.log(res.data.item.order))
      changed.current = false
    }
  }, [_id, orderAmount])
  return (
    <>
      <button className={`${_id} decrease`} onClick={() => handleDecrease()}>
        -
      </button>
      {orderAmount}
      <button onClick={() => handleIncrease()}>+</button>
    </>
  )
}
export default ChangeOrderAmount
