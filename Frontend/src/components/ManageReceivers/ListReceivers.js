import React from 'react'

const ListReceivers = ({ receivers }) => {
  return receivers.map((receiver) => (
    <div
      key={receiver.login}
    >{`${receiver.receiverName} ${receiver.login}`}</div>
  ))
}
export default ListReceivers
