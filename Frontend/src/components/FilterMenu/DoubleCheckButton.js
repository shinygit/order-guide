import React from 'react'

const DoubleCheckButton = ({
  items,
  handleShowDoubleCheck,
  activeFilterbuttonClass,
}) => {
  const doubleCheckCount = items.reduce((acc, item) => {
    const isFrequentItem = item.previousOrders.filter((x) => x > 0).length >= 3
    return item.orderAmount === 0 && isFrequentItem ? ++acc : acc
  }, 0)

  return (
    <button
      className={`w-auto p-4 m-1 border border-gray-900 rounded
        ${
          activeFilterbuttonClass === `double-check-filter-button`
            ? 'bg-gray-600 text-gray-200'
            : 'bg-gray-400'
        }
        `}
      key='Double Check'
      onClick={() => handleShowDoubleCheck()}
    >
      {`${'Double Check'}(${doubleCheckCount})`}
    </button>
  )
}

export default DoubleCheckButton

//        ${doubleCheckount > 0 ? 'border-2 border-red-600' : 'border'}
