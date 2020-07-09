import React from 'react'

const UncheckedFilterButton = ({
  items,
  handleShowUnchecked,
  activeFilterbuttonClass,
}) => {
  const uncheckedCount = items.reduce(
    (acc, item) => (item.orderAmount === null ? ++acc : acc),
    0
  )

  return (
    <button
      className={`w-auto p-4 m-1 border-gray-900 rounded 
        ${
          activeFilterbuttonClass === 'unchecked-filter-button'
            ? 'bg-gray-600 text-gray-200'
            : 'bg-gray-400'
        }
        ${uncheckedCount > 0 ? 'border-2 border-red-600' : 'border'}
        `}
      key='UNCHECKED'
      onClick={() => handleShowUnchecked()}
    >
      Unchecked({uncheckedCount})
    </button>
  )
}
export default UncheckedFilterButton
