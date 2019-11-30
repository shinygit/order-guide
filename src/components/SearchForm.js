import React, { useEffect } from 'react'
import Fuse from 'fuse.js'
const SearchForm = ({
  items,
  dispatchFilter,
  searchTerm,
  setSearchTerm,
  itemsCurrentlyFiltered,
  setItemsCurrentlyFiltered
}) => {
  const handleChange = event => {
    setSearchTerm(event.target.value)
  }
  useEffect(() => {
    setItemsCurrentlyFiltered(false)
  }, [setItemsCurrentlyFiltered, searchTerm])

  useEffect(() => {
    const fuse = new Fuse(items, { keys: ['itemName'] })
    let fuseResults = []
    if (searchTerm === '') {
      fuseResults = 'ALL'
    } else if (searchTerm.includes(' ')) {
      fuseResults = fuse.search(searchTerm)
    } else {
      fuseResults = items.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (itemsCurrentlyFiltered === false) {
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
