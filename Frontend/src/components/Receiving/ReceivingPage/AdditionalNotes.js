import React from 'react'

const AdditionalNotes = ({
  activeSupplier,
  additionalNotesForm,
  setAdditionalNotesForm,
  activeSupplierReceivedSubmitted,
}) => {
  const handleChangeInput = (event) => {
    setAdditionalNotesForm({
      ...additionalNotesForm,
      [activeSupplier.id]: event.target.value,
    })
  }
  return (
    <div className='w-11/12'>
      <span className='text-lg'>Additional Notes</span>
      <div className='p-1 border bg-white'>
        <textarea
          className='w-full resize-none outline-none'
          placeholder='Extra items received, substitutions, something you think might be missing, etc...'
          name='additionalNotesForm'
          value={additionalNotesForm[activeSupplier.id]}
          onChange={handleChangeInput}
          readOnly={activeSupplierReceivedSubmitted}
        />
      </div>
    </div>
  )
}
export default AdditionalNotes
