import React, { useState } from 'react'
import EditReceiver from './EditReceiver'

const ListReceivers = ({ receivers }) => {
  const [activeEditReceiver, setActiveEditReceiver] = useState('')

  return receivers.map((receiver) => (
    <div className='flex justify-between border' key={receiver.login}>
      <div className='py-1 px-3'>{receiver.receiverName}</div>
      <div className='py-1 px-3'>{receiver.login}</div>
      <div className=''>
        <EditReceiver
          receiver={receiver}
          setActiveEditReceiver={setActiveEditReceiver}
          activeEditReceiver={activeEditReceiver}
        />
      </div>
    </div>
  ))
}
export default ListReceivers
