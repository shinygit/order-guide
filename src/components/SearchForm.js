import React, { useEffect } from 'react'
const SearchForm = ({ items, dispatchFilter, searchTerm, setSearchTerm }) => {
  const handleChange = event => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    let results = []
    if (searchTerm === '') { results = 'ALL' } else {
      results = items.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    } dispatchFilter({ type: 'FILTER_SEARCH', results: results })
  }, [searchTerm, items, dispatchFilter])
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
