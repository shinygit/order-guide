import React from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
const FilterMenu = ({
  suppliers,
  locations,
  filter,
  dispatchFilter,
  setItemsCurrentlyFiltered
}) => {
  const handleShowSupplier = supplier => {
    setItemsCurrentlyFiltered(true)
    dispatchFilter({ type: 'FILTER_SUPPLIER', supplier: supplier })
  }
  const handleShowAll = () => {
    setItemsCurrentlyFiltered(true)
    dispatchFilter({ type: 'SHOW_ALL' })
  }
  const handleShowLocation = location => {
    setItemsCurrentlyFiltered(true)
    dispatchFilter({ type: 'FILTER_LOCATION', location: location })
  }
  return (
    <>
      <Button variant='contained' key='ALL' onClick={() => handleShowAll()}>
        ALL
      </Button>
      <br />
      <ButtonGroup>
        {suppliers.map(supplier => (
          <Button
            color='primary'
            variant='outlined'
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
            color='primary'
            variant='outlined'
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
