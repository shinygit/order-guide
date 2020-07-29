import React, { useState } from 'react'
import EditCategory from './EditCategory'

const ListCategories = ({ categories }) => {
  const [activeEdit, setActiveEdit] = useState('')
  return (
    <div className='border border-gray-300 p-1 bg-white'>
      {categories.map((category) => {
        if (activeEdit === category.categoryName) {
          return (
            <EditCategory category={category} setActiveEdit={setActiveEdit} />
          )
        }
        return (
          <div
            className='flex items-center border-b-2 border-gray-300 bg-white p-1 m-1 mb-2 justify-between'
            key={category.categoryName}
          >
            {category.categoryName}
            <button onClick={() => setActiveEdit(category.categoryName)}>
              Edit
            </button>
          </div>
        )
      })}
    </div>
  )
}
export default ListCategories
