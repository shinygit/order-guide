import React, { useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'

const SearchForm = () => {
  const [input, setInput] = useState('')

  const handleChange = (event) => {
    setInput(event.target.value)
    client.writeData({
      data: {
        filter: {
          searchTerm: input,
          filterType: 'ALL',
          filterName: 'ALL',
          __typename: 'Filter',
        },
      },
    })
  }

  const client = useApolloClient()

  return (
    <div>
      <input
        id='searchField'
        className='bg-white focus:outline-none
        focus:shadow-outline border-2 border-gray-500
         rounded-lg py-2 px-4 block w-full lg:w-1/2 mb-1'
        type='text'
        placeholder='Search... (will show hidden items)'
        value={input}
        onChange={handleChange}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            event.target.blur()
          }
        }}
      />
    </div>
  )
}

export default SearchForm
