import React from 'react'
const Loading = () => {
  return (
    <div className='flex'>
      <div className='text-6xl'>Loading</div>
      <div className='text-6xl animation-drip1'>.</div>
      <div className='text-6xl animation-drip2'>.</div>
      <div className='text-6xl animation-drip3'>.</div>
    </div>
  )
}
export default Loading
