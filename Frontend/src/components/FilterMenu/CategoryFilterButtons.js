import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_CATEGORIES } from '../../Queries/category'
const CategoryFilterButtons = ({
  handleShowCategory,
  activeFilterbuttonClass,
}) => {
  const {
    loading: loadingCategoriesData,
    data: allCategoriesData = { categories: [] },
  } = useQuery(GET_CATEGORIES)

  const categories = allCategoriesData.categories.map((a) => a.categoryName)

  return categories.map((category) => (
    <button
      className={`transition duration-200 ease-in-out w-auto p-4 m-1 border border-gray-900 rounded 
      ${
        activeFilterbuttonClass === `${category}-filter-button`
          ? 'bg-gray-600 text-gray-200'
          : 'bg-gray-400'
      }`}
      key={category}
      onClick={() => handleShowCategory(category)}
    >
      {category}
    </button>
  ))
}
export default CategoryFilterButtons
