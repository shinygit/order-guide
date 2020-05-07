import React, { useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'

const FilterMenu = ({
  suppliers,
  locations,
  toggleNewItem,
  newItemToggle,
  items
}) => {
  const client = useApolloClient()

  const uncheckedCount = items.reduce(
    (acc, item) => (item.orderAmount === null ? ++acc : acc),
    0
  )
  const marketPriceCount = items.reduce(
    (acc, item) => (item.supplier === 'Market Price' ? ++acc : acc),
    0
  )

  const [activeFilterbuttonClass, setActiveFilterbuttonClass] = useState(
    'all-filter-button'
  )
  const handleShowSupplier = (supplier) => {
    setActiveFilterbuttonClass(`${supplier}-filter-button`)
    client.writeData({
      data: {
        filter: {
          searchTerm: '',
          filterType: 'supplier',
          filterName: supplier,
          __typename: 'Filter'
        }
      }
    })
  }
  const handleShowAll = () => {
    setActiveFilterbuttonClass('all-filter-button')
    client.writeData({
      data: {
        filter: {
          searchTerm: '',
          filterType: 'ALL',
          filterName: 'ALL',
          __typename: 'Filter'
        }
      }
    })
  }
  const handleShowUnchecked = () => {
    setActiveFilterbuttonClass('unchecked-filter-button')
    client.writeData({
      data: {
        filter: {
          searchTerm: '',
          filterType: 'UNCHECKED',
          filterName: 'UNCHECKED',
          __typename: 'Filter'
        }
      }
    })
  }
  const handleShowLocation = (location) => {
    setActiveFilterbuttonClass(`${location}-filter-button`)
    client.writeData({
      data: {
        filter: {
          searchTerm: '',
          filterType: 'location',
          filterName: location,
          __typename: 'Filter'
        }
      }
    })
  }
  return (
    <>
      <div className='flex flex-row flex-wrap bg-gray-200 -mx-1 my-1'>
        <button
          className={`w-auto p-4 mx-1 border border-gray-900 rounded 
              ${
                activeFilterbuttonClass === 'all-filter-button'
                  ? 'bg-gray-600 text-gray-200'
                  : 'bg-gray-400'
          }`}
          key='ALL'
          onClick={() => handleShowAll()}
        >
          ALL
        </button>
        <button
          className={`w-auto p-4 mx-1 border border-gray-900 rounded 
              ${
                activeFilterbuttonClass === 'unchecked-filter-button'
                  ? 'bg-gray-600 text-gray-200'
                  : 'bg-gray-400'
          }`}
          key='UNCHECKED'
          onClick={() => handleShowUnchecked()}
        >
          Unchecked({uncheckedCount})
        </button>

        <button
          className={`w-auto p-4 mx-1 border border-gray-900 rounded
              ${
                activeFilterbuttonClass === `${'Market Price'}-filter-button`
                  ? 'bg-gray-600 text-gray-200'
                  : 'bg-gray-400'
          }`}
          key='Market Price'
          onClick={() => handleShowSupplier('Market Price')}
        >
          {`${'Market Price'}(${marketPriceCount})`}
        </button>

        <button
          className='w-auto p-4 mx-1 border border-gray-900 rounded bg-gray-100 ml-auto'
          onClick={() => toggleNewItem()}
        >
          {newItemToggle ? 'Cancel' : 'New Item'}
        </button>
      </div>
      <div className='flex flex-row flex-wrap bg-gray-200 -mx-1 my-1'>
        {suppliers.map((supplier) => {
          if (supplier !== 'Market Price') {
            return (
              <button
                className={`w-auto p-4 mx-1 border border-gray-900 rounded
              ${
                activeFilterbuttonClass === `${supplier}-filter-button`
                  ? 'bg-gray-600 text-gray-200'
                  : 'bg-gray-400'
                }`}
                key={supplier}
                onClick={() => handleShowSupplier(supplier)}
              >
                {supplier}
              </button>
            )
          }
        })}
      </div>
      <div className='flex flex-row flex-wrap bg-gray-200 -mx-1 my-1'>
        {locations.map((location) => (
          <button
            className={`w-auto p-4 mx-1 border border-gray-900 rounded 
              ${
                activeFilterbuttonClass === `${location}-filter-button`
                  ? 'bg-gray-600 text-gray-200'
                  : 'bg-gray-400'
            }`}
            key={location}
            onClick={() => handleShowLocation(location)}
          >
            {location}
          </button>
        ))}
      </div>
    </>
  )
}
export default FilterMenu
