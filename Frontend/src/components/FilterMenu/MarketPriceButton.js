import React from 'react'

const MarketPriceButton = ({
  items,
  handleShowSupplier,
  activeFilterbuttonClass,
}) => {
  const marketPriceCount = items.reduce(
    (acc, item) =>
      item.supplier === 'Market Price' && item.orderAmount > 0 ? ++acc : acc,
    0
  )

  return (
    <button
      className={`w-auto p-4 m-1 border-gray-900 rounded
        ${
          activeFilterbuttonClass === `${'Market Price'}-filter-button`
            ? 'bg-gray-600 text-gray-200'
            : 'bg-gray-400'
        }
        ${marketPriceCount > 0 ? 'border-2 border-red-600' : 'border'}
        
        `}
      key='Market Price'
      onClick={() => handleShowSupplier('Market Price')}
    >
      {`${'Market Price'}(${marketPriceCount})`}
    </button>
  )
}

export default MarketPriceButton
