import React from 'react'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import { FILTER_QUERY } from '../Queries/filter'

const SearchForm = () => {
  const {
    data: {
      filter: { searchTerm },
    },
  } = useQuery(FILTER_QUERY)
  const client = useApolloClient()

  const handleChange = (event) => {
    client.writeData({
      data: {
        filter: {
          searchTerm: event.target.value,
          __typename: 'Filter',
        },
      },
    })
  }
  return (
    <div>
      <input
        id='searchField'
        className='bg-white focus:outline-none
        focus:shadow-outline border-2 border-gray-500
         rounded-lg py-2 px-4 block w-full lg:w-1/2 mb-1'
        type='text'
        placeholder='Search...'
        value={searchTerm}
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
