import React, { useRef, useEffect } from 'react'

const ChangeOrderAmount = ({ id, orderAmount, dispatchItems }) => {
  const handleDecrease = () => {}
  const handleIncrease = () => {}

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
