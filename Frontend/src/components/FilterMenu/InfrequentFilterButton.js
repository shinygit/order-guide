import React from 'react'

const UncheckedFilterButton = ({
  handleShowInfrequent,
  activeFilterbuttonClass,
}) => {
  return (
    <button
      className={`w-auto p-4 m-1 border border-gray-900 rounded 
        ${
          activeFilterbuttonClass === 'infrequent-filter-button'
            ? 'bg-gray-600 text-gray-200'
            : 'bg-gray-400'
        }
        `}
      key='INFREQUENT'
      onClick={() => handleShowInfrequent()}
    >
      Infrequent
    </button>
  )
}
export default UncheckedFilterButton
