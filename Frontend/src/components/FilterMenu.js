import React, { useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'

const FilterMenu = ({ suppliers, locations }) => {
  const client = useApolloClient()
  const [activeFilterbuttonClass, setActiveFilterbuttonClass] = useState(
    'all-filter-button'
  )
  const handleShowSupplier = supplier => {
    setActiveFilterbuttonClass(`${supplier}-filter-button`)
    client.writeData({
      data: {
        filter: {
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
          filterType: 'UNCHECKED',
          filterName: 'UNCHECKED',
          __typename: 'Filter'
        }
      }
    })
  }
  const handleShowLocation = location => {
    setActiveFilterbuttonClass(`${location}-filter-button`)
    client.writeData({
      data: {
        filter: {
          filterType: 'location',
          filterName: location,
          __typename: 'Filter'
        }
      }
    })
  }
  return (
    <>
      <button
        className='all-filter-button'
        color='primary'
        variant={
          activeFilterbuttonClass === 'all-filter-button'
            ? 'contained'
            : 'outlined'
        }
        key='ALL'
        onClick={() => handleShowAll()}
      >
        ALL
      </button>
      <button
        className='unchecked-filter-button'
        color='primary'
        variant={
          activeFilterbuttonClass === 'unchecked-filter-button'
            ? 'contained'
            : 'outlined'
        }
        key='UNCHECKED'
        onClick={() => handleShowUnchecked()}
      >
        Unchecked
      </button>
      <br />
      <buttonGroup>
        {suppliers.map(supplier => (
          <button
            className={`${supplier}-filter-button`}
            color='primary'
            variant={
              activeFilterbuttonClass === `${supplier}-filter-button`
                ? 'contained'
                : 'outlined'
            }
            key={supplier}
            onClick={() => handleShowSupplier(supplier)}
          >
            {supplier}
          </button>
        ))}
      </buttonGroup>
      <br />
      <buttonGroup>
        {locations.map(location => (
          <button
            className={`${location}-filter-button`}
            color='primary'
            variant={
              activeFilterbuttonClass === `${location}-filter-button`
                ? 'contained'
                : 'outlined'
            }
            key={location}
            onClick={() => handleShowLocation(location)}
          >
            {location}
          </button>
        ))}
      </buttonGroup>
    </>
  )
}
export default FilterMenu
