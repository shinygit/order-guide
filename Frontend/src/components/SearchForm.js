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
  }, [searchTerm, client])
  return (
    <div>
      <input
        id='searchField'
        className='bg-white focus:outline-none
        focus:shadow-outline border border-gray-300
         rounded-lg py-2 px-4 block w-full mb-1'
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={handleChange}
        onKeyPress={event => {
          if (event.key === 'Enter') {
            event.target.blur()
          }
        }}
      />
    </div>
  )
}

export default SearchForm
