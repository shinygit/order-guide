import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { GET_CATEGORIES } from '../../../Queries/category'

const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: categoryInput) {
    createCategory(input: $input) {
      ... on CategoryError {
        error
      }
      ... on Category {
        id
        categoryName
      }
    }
  }
`
const CreateCategory = () => {
  const [isActive, setIsActive] = useState(false)
  const [createCategory] = useMutation(CREATE_CATEGORY, {
    update(cache, { data: { createCategory } }) {
      if (createCategory.__typename === 'Category') {
        const { categories } = cache.readQuery({ query: GET_CATEGORIES })
        cache.writeQuery({
          query: GET_CATEGORIES,
          data: { categories: categories.concat([createCategory]) },
        })
      }
    },
  })
  const [newCategoryForm, setNewCategoryForm] = useState({
    categoryName: '',
  })
  const [errors, setErrors] = useState('')
  const handleChangeInput = (event) => {
    setNewCategoryForm({
      ...newCategoryForm,
      [event.target.name]: event.target.value,
    })
  }
  const handleSaveCategory = async () => {
    const result = await createCategory({
      variables: { input: newCategoryForm },
    })
    if (result.data.createCategory.error) {
      setErrors(result.data.createCategory.error)
    }
    if (result.data.createCategory.id) {
      setErrors('')
      setIsActive(false)
      setNewCategoryForm({ categoryName: '' })
    }
  }
  return (
    <div className='flex flex-col w-56 mt-5'>
      <button
        className='rounded border border-gray-600 bg-gray-300'
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? 'Cancel' : 'Add New Category'}
      </button>
      {isActive && (
        <div className='flex flex-col items-end'>
          <input
            className='rounded border border-gray-400 mt-4 w-40'
            value={newCategoryForm.categoryName}
            name='categoryName'
            placeholder='Category Name...'
            onChange={handleChangeInput}
          ></input>
          <button
            className='border rounded border-gray-600 bg-green-100 w-20 mt-2'
            onClick={handleSaveCategory}
          >
            Save
          </button>
          {errors}
        </div>
      )}
    </div>
  )
}

export default CreateCategory
