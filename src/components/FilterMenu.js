import React from 'react'
const FilterMenu = ({ suppliers, locations, filter, dispatchFilter }) => {
  const handleShowSupplier = (supplier) => {
    dispatchFilter({ type: 'FILTER_SUPPLIER', supplier: supplier })
  }
  const handleShowAll = () => {
    dispatchFilter({ type: 'SHOW_ALL' })
  }
  const handleShowLocation = (location) => {
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
