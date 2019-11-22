import React, { useState, useEffect } from 'react'
const SearchForm = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const handleChange = event => {
    setSearchTerm(event.target.value)
  }
  useEffect(() => {
    if (searchTerm === '') { setSearchResults([]) } else {
      const results = items.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setSearchResults(results)
    }
  }, [searchTerm, items])
  return (
    <div>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={handleChange}
      />
      <br />
      <ul>
        {searchResults.map(item => (
          <li key={item.itemName}>{item.itemName}</li>
        ))}
      </ul>
    </div>
  )
}

export default SearchForm
