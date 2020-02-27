import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'

const SearchForm = () => {
  const client = useApolloClient()
  const [searchTerm, setSearchTerm] = useState('')
  const handleChange = event => {
    setSearchTerm(event.target.value)
  }
  useEffect(() => {
    client.writeData({
      data: {
        filter: {
          searchTerm: searchTerm,
          __typename: 'Filter'
        }
      }
    })
  }, [searchTerm])
  return (
    <div>
      <input
        className='bg-white focus:outline-none 
        focus:shadow-outline border border-gray-300
         rounded-lg py-2 px-4 block w-full'
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
