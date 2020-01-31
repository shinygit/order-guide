import React, { useRef, useEffect } from 'react'
import api from '../api/items'

const ChangeOrderAmount = ({ id, orderAmount, dispatchItems }) => {
  const changed = useRef(false)
  const apiTimer = useRef(false)
  const handleDecrease = () => {
    dispatchItems({ type: 'DECREASE_ORDER_AMOUNT', id: id })
    changed.current = true
  }
  const handleIncrease = () => {
    dispatchItems({ type: 'INCREASE_ORDER_AMOUNT', id: id })
    changed.current = true
  }
  useEffect(() => {
    if (changed.current) {
      clearTimeout(apiTimer.current)
      let pendingApiCall = () => {
        api
          .updateItemById(id, { order: orderAmount })
          .then(res => {
            console.log(res.data.item.order)
            pendingApiCall = false
          })
          .catch(err => {
            console.log(err)
            apiTimer.current = setTimeout(pendingApiCall, 5000)
          })
        changed.current = false
      }
      pendingApiCall()
    }
  }, [id, orderAmount])
  return (
    <>
      <button className={`${id} decrease`} onClick={() => handleDecrease()}>
        -
      </button>
      {orderAmount}
      <button onClick={() => handleIncrease()}>+</button>
    </>
  )
}
export default ChangeOrderAmount
