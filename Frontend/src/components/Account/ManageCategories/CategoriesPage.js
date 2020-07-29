import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Loading from '../../Loading'
import CreateCategory from './CreateCategory'
import ListCategories from './ListCategories'
import { GET_CATEGORIES } from '../../../Queries/category'

const ReceiversPage = () => {
  const { data, loading, errors } = useQuery(GET_CATEGORIES)

  if (loading) return <Loading />
  const { categories } = data
  return (
    <div className=''>
      <div className='flex justify-center p-3'>
        <div className='flex flex-col'>
          <ListCategories categories={categories} />
          <CreateCategory />
        </div>
      </div>
    </div>
  )
}
export default ReceiversPage
