import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_CATEGORIES } from '../../Queries/category'

const CategorySelector = ({ handleChangeInput, currentCategorySelection }) => {
  const {
    loading: loadingCategoriesData,
    data: allCategoriesData = { categories: [] },
  } = useQuery(GET_CATEGORIES)

  const listOfCategories = allCategoriesData.categories.map(
    (a) => a.categoryName
  )

  if (!loadingCategoriesData)
    return (
      <div className='inline-block relative min-w-full'>
        <select
          className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow focus:outline-none focus:shadow-outline'
          name='category'
          value={currentCategorySelection}
          onChange={handleChangeInput}
        >
          <option key='unset' value={null}></option>
          {listOfCategories.map((categoryName) => (
            <option key={categoryName} value={categoryName}>
              {categoryName}
            </option>
          ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
          <svg
            className='fill-current h-4 w-4'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
          >
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
          </svg>
        </div>
      </div>
    )
  return null
}
export default CategorySelector
