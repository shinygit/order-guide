import React, { useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import OrderLock from './OrderLock/OrderLock.js'
import OrderModeToggle from './OrderModeToggle/OrderModeToggle'
import OrderPlacedToggle from './OrderPlacedToggle'
import SupplierFilterButtons from './FilterMenu/SupplierFilterButtons'
import LocationFilterButtons from './FilterMenu/LocationFilterButtons'
import CategoryFilterButtons from './FilterMenu/CategoryFilterButtons'
import MarketPriceButton from './FilterMenu/MarketPriceButton'
import UncheckedFilterButton from './FilterMenu/UncheckedFilterButton'
import DoubleCheckButton from './FilterMenu/DoubleCheckButton'
import AddItemButton from './AddItemButton'
import InfrequentFilterButton from './FilterMenu/InfrequentFilterButton.js'

const FilterMenu = ({
  locations,
  toggleNewItem,
  newItemToggle,
  items,
  orderId,
}) => {
  const client = useApolloClient()

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
          __typename: 'Filter',
        },
      },
    })
  }
  const handleShowCategory = (category) => {
    setActiveFilterbuttonClass(`${category}-filter-button`)
    client.writeData({
      data: {
        filter: {
          searchTerm: '',
          filterType: 'category',
          filterName: category,
          __typename: 'Filter',
        },
      },
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
          __typename: 'Filter',
        },
      },
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
          __typename: 'Filter',
        },
      },
    })
  }
  const handleShowDoubleCheck = () => {
    setActiveFilterbuttonClass('double-check-filter-button')
    client.writeData({
      data: {
        filter: {
          searchTerm: '',
          filterType: 'DOUBLECHECK',
          filterName: 'DOUBLECHECK',
          __typename: 'Filter',
        },
      },
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
          __typename: 'Filter',
        },
      },
    })
  }
  const handleShowShorted = (location) => {
    setActiveFilterbuttonClass(`shorted-filter-button`)
    client.writeData({
      data: {
        filter: {
          searchTerm: '',
          filterType: 'SHORTED',
          filterName: 'SHORTED',
          __typename: 'Filter',
        },
      },
    })
  }
  const handleShowInfrequent = () => {
    setActiveFilterbuttonClass(`infrequent-filter-button`)
    client.writeData({
      data: {
        filter: {
          searchTerm: '',
          filterType: 'INFREQUENT',
          filterName: 'INFREQUENT',
          __typename: 'Filter',
        },
      },
    })
  }
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row flex-wrap my-1 bg-gray-200'>
        <OrderLock />
        <OrderModeToggle />

        <OrderPlacedToggle orderId={orderId} />

        <AddItemButton locations={locations} />
      </div>
      <div className='flex flex-row flex-wrap my-1 bg-gray-200'>
        <button
          className={`w-auto p-4 m-1 border border-gray-900 rounded 
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
        <UncheckedFilterButton
          items={items}
          activeFilterbuttonClass={activeFilterbuttonClass}
          handleShowUnchecked={handleShowUnchecked}
        />

        <MarketPriceButton
          items={items}
          handleShowSupplier={handleShowSupplier}
          activeFilterbuttonClass={activeFilterbuttonClass}
        />
        <DoubleCheckButton
          items={items}
          handleShowDoubleCheck={handleShowDoubleCheck}
          activeFilterbuttonClass={activeFilterbuttonClass}
        />
        <button
          className={`m-1 flex flex-col items-center w-auto py-1 px-4 mx-1 border border-gray-900 rounded 
              ${
                activeFilterbuttonClass === 'shorted-filter-button'
                  ? 'bg-gray-600 text-gray-200'
                  : 'bg-gray-400'
              }`}
          key='SHORTED'
          onClick={() => handleShowShorted()}
        >
          <span>Attention</span>
          <span>Needed</span>
        </button>
        <InfrequentFilterButton
          handleShowInfrequent={handleShowInfrequent}
          activeFilterbuttonClass={activeFilterbuttonClass}
        />
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-row flex-wrap order-1 my-2 bg-gray-200 border border-gray-900 rounded md:order-3'>
          <span className='w-full font-semibold tracking-wider text-center text-gray-700'>
            SUPPLIERS
          </span>

          <SupplierFilterButtons
            orderId={orderId}
            items={items}
            handleShowSupplier={handleShowSupplier}
            activeFilterbuttonClass={activeFilterbuttonClass}
          />
        </div>
        <div className='flex flex-row flex-wrap order-2 my-2 bg-gray-200 border border-gray-900 rounded'>
          <span className='w-full font-semibold tracking-wider text-center text-gray-700'>
            CATEGORIES
          </span>

          <CategoryFilterButtons
            handleShowCategory={handleShowCategory}
            activeFilterbuttonClass={activeFilterbuttonClass}
          />
        </div>
        <div className='flex flex-row flex-wrap order-3 my-2 bg-gray-200 border border-gray-900 rounded md:order-1'>
          <span className='w-full font-semibold tracking-wider text-center text-gray-700'>
            LOCATIONS
          </span>
          <LocationFilterButtons
            locations={locations}
            handleShowLocation={handleShowLocation}
            activeFilterbuttonClass={activeFilterbuttonClass}
          />
        </div>
      </div>
    </div>
  )
}
export default FilterMenu
