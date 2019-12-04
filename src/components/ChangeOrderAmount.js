import React from 'react'
const ChangeOrderAmount = ({ id, orderAmount, dispatchItems }) => {
  const handleDecrease = () => {
    dispatchItems({ type: 'DECREASE_ORDER_AMOUNT', id: id })
  }
  const handleIncrease = () => {
    dispatchItems({ type: 'INCREASE_ORDER_AMOUNT', id: id })
  }
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
