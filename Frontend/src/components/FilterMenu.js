import React, { useState } from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
const FilterMenu = ({
  suppliers,
  locations,
  filter,
  dispatchFilter,
  setItemsCurrentlyFiltered
}) => {
  const [activeFilterButtonClass, setActiveFilterButtonClass] = useState('ALL')
  const handleShowSupplier = supplier => {
    setItemsCurrentlyFiltered(true)
    setActiveFilterButtonClass(`${supplier.supplier}-filter-button`)
    dispatchFilter({ type: 'FILTER_SUPPLIER', supplier: supplier })
  }
  const handleShowAll = () => {
    setItemsCurrentlyFiltered(false)
    setActiveFilterButtonClass('all-filter-button')
    dispatchFilter({ type: 'SHOW_ALL' })
  }
  const handleShowLocation = location => {
    setActiveFilterButtonClass(`${location.location}-filter-button`)
    setItemsCurrentlyFiltered(true)
    dispatchFilter({ type: 'FILTER_LOCATION', location: location })
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
