import React, { useState } from 'react'
import EditReceiver from './EditReceiver'

const ListReceivers = ({ receivers }) => {
  const [activeEditReceiver, setActiveEditReceiver] = useState('')

  return (
    <div className='border border-gray-300 p-1 bg-white'>
      {receivers.map((receiver) => (
        <div
          className='flex items-center border-b-2 border-gray-300 bg-white p-1 m-1 mb-2'
          key={receiver.login}
        >
          <div className='pr-3'>{receiver.receiverName}</div>
          <div className='px-3 ml-auto'>{receiver.login}</div>
          <div className=''>
            <EditReceiver
              receiver={receiver}
              setActiveEditReceiver={setActiveEditReceiver}
              activeEditReceiver={activeEditReceiver}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
export default ListReceivers
