import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import OrderLock from './OrderLock/OrderLock.js'
import OrderModeToggle from './OrderModeToggle/OrderModeToggle'
import OrderPlacedToggle from './OrderPlacedToggle'
import SupplierFilterButtons from './FilterMenu/SupplierFilterButtons'
import { FILTER_QUERY } from '../Queries/filter'
const FilterMenu = ({
  suppliers,
  locations,
  toggleNewItem,
  newItemToggle,
  items,
  orderId,
  setTableHeaderOffset,
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
  const {
    data: {
      filter: { filterType },
    },
  } = useQuery(FILTER_QUERY)
  useEffect(() => {
    const supplierDiv = document.querySelector('.lsdfkj')
    const locationDiv = document.querySelector('.bnmv')
    const elDistanceToTop =
      window.pageYOffset + supplierDiv.getBoundingClientRect().top
    const locationDivDistanceToTop =
      window.pageYOffset + locationDiv.getBoundingClientRect().top

    window.addEventListener('scroll', (e) => {
      if (filterType === 'supplier') {
        setTableHeaderOffset({
          offset: supplierDiv.getBoundingClientRect().height,
        })
        if (elDistanceToTop - window.scrollY < 0) {
          locationDiv.classList.remove('fixed')
          locationDiv.classList.remove('top-0')
          locationDiv.classList.add('my-2')
          locationDiv.classList.remove('w-11/12')
        }
      }
      if (filterType === 'location') {
        setTableHeaderOffset({
          offset: locationDiv.getBoundingClientRect().height,
        })
        if (locationDivDistanceToTop - window.scrollY < 0) {
          supplierDiv.classList.remove('fixed')
          supplierDiv.classList.remove('top-0')
          supplierDiv.classList.add('my-2')
          supplierDiv.classList.remove('w-11/12')
        }
      }

      if (filterType === 'supplier') {
        if (elDistanceToTop - window.scrollY < 0) {
          supplierDiv.classList.add('fixed')
          supplierDiv.classList.add('top-0')
          supplierDiv.classList.remove('my-2')
          supplierDiv.classList.add('w-11/12')
        }
      }
      if (elDistanceToTop - window.scrollY > 0) {
        supplierDiv.classList.remove('fixed')
        supplierDiv.classList.remove('top-0')
        supplierDiv.classList.add('my-2')
        supplierDiv.classList.remove('w-11/12')
      }

      if (filterType === 'location') {
        if (locationDivDistanceToTop - window.scrollY < 0) {
          locationDiv.classList.add('fixed')
          locationDiv.classList.add('top-0')
          locationDiv.classList.remove('my-2')
          locationDiv.classList.add('w-11/12')
        }
      }
      if (locationDivDistanceToTop - window.scrollY > 0) {
        locationDiv.classList.remove('fixed')
        locationDiv.classList.remove('top-0')
        locationDiv.classList.add('my-2')
        locationDiv.classList.remove('w-11/12')
      }
      if (filterType !== 'location' && filterType !== 'supplier') {
        setTableHeaderOffset({
          offset: 0,
        })
      }
    })
  }, [filterType, setTableHeaderOffset])
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row flex-wrap bg-gray-200 my-1'>
        <OrderLock />
        <OrderModeToggle />

        <OrderPlacedToggle orderId={orderId} />

        <button
          className='w-auto p-4 mx-1 border border-gray-900 rounded bg-gray-100 ml-auto'
          onClick={() => toggleNewItem()}
        >
          {newItemToggle ? 'Cancel' : 'New Item'}
        </button>
      </div>
      <div className='flex flex-row flex-wrap bg-gray-200 my-1'>
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
      </div>
      <div className='lsdfkj md:order-last flex flex-row flex-wrap bg-gray-200 my-2 border border-gray-900 rounded'>
        <span className='w-full text-center font-semibold text-gray-700 tracking-wider'>
          SUPPLIERS
        </span>

        <SupplierFilterButtons
          orderId={orderId}
          handleShowSupplier={handleShowSupplier}
          activeFilterbuttonClass={activeFilterbuttonClass}
        />
      </div>
      <div className='bnmv flex flex-row flex-wrap bg-gray-200 my-2 border border-gray-900 rounded'>
        <span className='w-full text-center font-semibold text-gray-700 tracking-wider'>
          LOCATIONS
        </span>
        {locations.map((location) => (
          <button
            className={`transition duration-200 ease-in-out w-auto p-4 m-1 border border-gray-900 rounded 
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
    </div>
  )
}
export default FilterMenu
