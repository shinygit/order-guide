import React from 'react'
const FilterMenu = ({ suppliers, locations, filter, dispatchFilter, setItemsCurrentlyFiltered }) => {
  const handleShowSupplier = (supplier) => {
    setItemsCurrentlyFiltered(true)
    dispatchFilter({ type: 'FILTER_SUPPLIER', supplier: supplier })
  }
  const handleShowAll = () => {
    setItemsCurrentlyFiltered(false)
    dispatchFilter({ type: 'SHOW_ALL' })
  }
  const handleShowLocation = (location) => {
    setItemsCurrentlyFiltered(true)
    dispatchFilter({ type: 'FILTER_LOCATION', location: location })
  }
  return (
    <>
      <button key='ALL' onClick={() => handleShowAll()}>ALL</button>
      {suppliers.map(supplier => (
        <button key={supplier} onClick={() => handleShowSupplier({ supplier })}>{supplier}</button>
      ))}
      <br />
      {locations.map(location => (
        <button key={location} onClick={() => handleShowLocation({ location })}>{location}</button>
      ))}
    </>
  )
}
export default FilterMenu
