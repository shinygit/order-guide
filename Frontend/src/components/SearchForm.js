import React, { useState, useEffect, useRef } from 'react'
import { useApolloClient } from '@apollo/react-hooks'

const SearchForm = () => {
  const searchField = useRef(null)
  const client = useApolloClient()
  const [input, setInput] = useState('')

  const handleChange = (event) => {
    setInput(event.target.value)
  }
  const handleClear = () => {
    setInput('')
    searchField.current.focus()
  }
  useEffect(
    () =>
      client.writeData({
        data: {
          filter: {
            searchTerm: input,
            filterType: 'ALL',
            filterName: 'ALL',
            __typename: 'Filter',
          },
        },
      }),
    [input]
  )
  return (
    <div
      className='flex justify-between bg-white
    focus-within:border-blue-500 border-2 border-gray-500
     rounded-lg py-2 px-4 w-full lg:w-1/2 mb-1'
    >
      <input
        id='searchField'
        className='w-full focus:outline-none'
        type='text'
        placeholder='Search... (will show hidden items)'
        value={input}
        onChange={handleChange}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            event.target.blur()
          }
        }}
        ref={searchField}
      />
      <button
        onClick={handleClear}
        className='shadow text-gray-700 border border-gray-700 rounded-md px-1 bg-gray-100'
      >
        clear
      </button>
    </div>
  )
}

export default SearchForm
