import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { GET_CATEGORIES } from '../../../Queries/category'

const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: ID!, $input: categoryInput!) {
    updateCategory(id: $id, input: $input) {
      ... on Category {
        id
        categoryName
      }
      ... on CategoryError {
        error
      }
    }
  }
`
const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      ... on Category {
        id
        categoryName
      }
      ... on CategoryError {
        error
      }
    }
  }
`

const EditCategory = ({ category, setActiveEdit }) => {
  const [updateCategory] = useMutation(UPDATE_CATEGORY)
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    update(cache, { data: { deleteCategory } }) {
      if (deleteCategory.id) {
        const { categories } = cache.readQuery({
          query: GET_CATEGORIES,
        })
        cache.writeQuery({
          query: GET_CATEGORIES,
          data: {
            categories: categories.filter(
              (categoryCache) => categoryCache.id !== category.id
            ),
          },
        })
      }
    },
  })

  const [errors, setErrors] = useState({
    categoryNameError: '',
  })
  const [updateFields, setUpdateFields] = useState({
    categoryName: '',
  })
  const cancel = () => {
    setUpdateFields({
      categoryName: '',
    })
    setErrors({
      categoryNameError: '',
    })
    setActiveEdit('')
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await updateCategory({
      variables: {
        id: category.id,
        input: { categoryName: updateFields.categoryName },
      },
    })
    if (result.data.updateCategory.__typename === 'Category') {
      setActiveEdit('')
    }
    if (result.data.updateCategory.__typename === 'UpdateCategoryError') {
      setErrors({
        ...result.data.updateCategory,
      })
    }
  }

  const handleChangeInput = (event) => {
    setUpdateFields({
      ...updateFields,
      [event.target.name]: event.target.value,
    })
  }

  const handleDeleteClick = async () => {
    if (
      window.confirm(`Do you really want to delete ${category.categoryName}?`)
    ) {
      await deleteCategory({
        variables: { id: category.id },
      })
      setActiveEdit('')
    }
  }

  return (
    <div className='absolute border p-3 bg-gray-300 shadow-xl flex flex-col'>
      <span>{category.categoryName}</span>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <label>
          Category Name:
          <input
            className='m-2'
            type='text'
            name='categoryName'
            value={updateFields.categoryName}
            onChange={handleChangeInput}
            onFocus={() =>
              setErrors({
                categoryNameError: '',
              })
            }
          />
        </label>
        <span>{errors.categoryNameError}</span>

        <div className='flex justify-between mt-4'>
          <button
            type='button'
            className='border border-gray-700 bg-gray-200 text-gray-800 p-2 rounded'
            onClick={cancel}
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={handleDeleteClick}
            className='border border-red-600 text-red-800 bg-red-200 p-1 rounded'
          >
            Delete
          </button>
          <input
            className='border border-green-600 text-green-800 bg-green-100 p-2 rounded'
            type='submit'
            value='Submit'
          />
        </div>
      </form>
    </div>
  )
}

export default EditCategory
