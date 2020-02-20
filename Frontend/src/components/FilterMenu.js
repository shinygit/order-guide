import React, { useState } from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import { useApolloClient } from '@apollo/react-hooks'

const FilterMenu = ({ suppliers, locations }) => {
  const client = useApolloClient()
  const [activeFilterButtonClass, setActiveFilterButtonClass] = useState(
    'all-filter-button'
  )
  const handleShowSupplier = supplier => {
    setActiveFilterButtonClass(`${supplier.supplier}-filter-button`)
    client.writeData({
      data: {
        filter: {
          filterType: 'supplier',
          filterName: supplier.supplier,
          __typename: 'Filter'
        }
      }
    })
  }
  const handleShowAll = () => {
    setActiveFilterButtonClass('all-filter-button')
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
    setActiveFilterButtonClass('unchecked-filter-button')
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
    setActiveFilterButtonClass(`${location.location}-filter-button`)
    client.writeData({
      data: {
        filter: {
          filterType: 'location',
          filterName: location.location,
          __typename: 'Filter'
        }
      }
    })
  }
  return (
    <>
      <Button
        className='all-filter-button'
        color='primary'
        variant={
          activeFilterButtonClass === 'all-filter-button'
            ? 'contained'
            : 'outlined'
        }
        key='ALL'
        onClick={() => handleShowAll()}
      >
        ALL
      </Button>
      <Button
        className='unchecked-filter-button'
        color='primary'
        variant={
          activeFilterButtonClass === 'unchecked-filter-button'
            ? 'contained'
            : 'outlined'
        }
        key='UNCHECKED'
        onClick={() => handleShowUnchecked()}
      >
        Unchecked
      </Button>
      <br />
      <ButtonGroup>
        {suppliers.map(supplier => (
          <Button
            className={`${supplier}-filter-button`}
            color='primary'
            variant={
              activeFilterButtonClass === `${supplier}-filter-button`
                ? 'contained'
                : 'outlined'
            }
            key={supplier}
            onClick={() => handleShowSupplier({ supplier })}
          >
            {supplier}
          </Button>
        ))}
      </ButtonGroup>
      <br />
      <ButtonGroup>
        {locations.map(location => (
          <Button
            className={`${location}-filter-button`}
            color='primary'
            variant={
              activeFilterButtonClass === `${location}-filter-button`
                ? 'contained'
                : 'outlined'
            }
            key={location}
            onClick={() => handleShowLocation({ location })}
          >
            {location}
          </Button>
        ))}
      </ButtonGroup>
    </>
  )
}
export default FilterMenu
