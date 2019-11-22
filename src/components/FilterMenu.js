import React from 'react'
const FilterMenu = ({ suppliers, filter, dispatchFilter }) => {
  const handleShowSupplier = (supplier) => {
    dispatchFilter({ type: 'supplierFilter', supplier: supplier })
  }
  const handleShowAll = () => {
    dispatchFilter({ type: 'SHOW_ALL' })
  }
  return (
    <>
      <button key='ALL' onClick={() => handleShowAll()}>ALL</button>
      {suppliers.map(supplier => (
        <button key={supplier} onClick={() => handleShowSupplier({ supplier })}>{supplier}</button>
      ))}
    </>
  )
}
export default FilterMenu
