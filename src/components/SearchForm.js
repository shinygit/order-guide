import React, { useEffect } from 'react'
import Fuse from 'fuse.js'
const SearchForm = ({ items, dispatchFilter, searchTerm, setSearchTerm, itemsCurrentlyFiltered, setItemsCurrentlyFiltered }) => {
  const handleChange = event => {
    setSearchTerm(event.target.value)
  }
  useEffect(() => {
    setItemsCurrentlyFiltered(false)
  }, [setItemsCurrentlyFiltered, searchTerm])
  useEffect(() => {
    const fuse = new Fuse(items, { keys: ['itemName'] })
    let fuseResults = []
    if (searchTerm === '') { fuseResults = 'ALL' } else {
      fuseResults = fuse.search(searchTerm)
      console.log(fuseResults)
    } if (itemsCurrentlyFiltered === false) {
      dispatchFilter({ type: 'FILTER_SEARCH', results: fuseResults })
    }
  }, [searchTerm, items, dispatchFilter, itemsCurrentlyFiltered])
  return (
    <div>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={handleChange}
      />
      <br />
      <ul />
    </div>
  )
}

export default SearchForm
