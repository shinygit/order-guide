import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import ConfirmMethod from './ConfirmMethod'
import { GET_NOTIFICATION_METHODS } from '../../../Queries/notificationMethod'

const DELETE_NOTIFICIATION_METHOD = gql`
  mutation deleteNotificationMethod($id: ID!) {
    deleteNotificationMethod(id: $id)
  }
`

const ListNotificationMethods = ({ notificationMethods }) => {
  const [deleteNotificationMethod] = useMutation(DELETE_NOTIFICIATION_METHOD)

  const deleteMethod = (id) => {
    deleteNotificationMethod({
      variables: { id: id },
      update: (cache, { data: { deleteNotificationMethod } }) => {
        if (deleteNotificationMethod === true) {
          const { notificationMethods } = cache.readQuery({
            query: GET_NOTIFICATION_METHODS,
          })
          cache.writeQuery({
            query: GET_NOTIFICATION_METHODS,
            data: {
              notificationMethods: notificationMethods.filter(
                (methodCache) => methodCache.id !== id
              ),
            },
          })
        }
      },
    })
  }

  return (
    <div className='border border-gray-300 p-1 bg-white'>
      {notificationMethods.map((method) => (
        <div
          key={method.id}
          className=' border-b-2 border-gray-300 bg-white p-1 m-1 mb-2'
        >
          <div className='flex justify-between items-center'>
            <div className='pr-3 mr-auto'>
              {method.email || method.phoneNumber}
            </div>
            <div
              className={`border border-gray-800 rounded-full + ${
                method.confirmed ? 'bg-green-500' : 'bg-orange-500'
              }`}
            >
              {method.confirmed ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  className='stroke-current text-gray-500 h-6'
                >
                  <path
                    fill='#FFF'
                    d='M8.294 16.998c-.435 0-.847-.203-1.111-.553L3.61 11.724c-.465-.613-.344-1.486.27-1.951.615-.467 1.488-.344 1.953.27l2.351 3.104 5.911-9.492c.407-.652 1.267-.852 1.921-.445.653.406.854 1.266.446 1.92L9.478 16.34c-.242.391-.661.635-1.12.656-.022.002-.042.002-.064.002z'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  className='stroke-current text-gray-500 h-6'
                >
                  <path
                    fill='#FFF'
                    d='M14.09 2.233C12.95 1.411 11.518 1 9.794 1c-1.311 0-2.418.289-3.317.868C5.05 2.774 4.292 4.313 4.2 6.483h3.307c0-.633.185-1.24.553-1.828.369-.586.995-.879 1.878-.879.898 0 1.517.238 1.854.713.339.477.508 1.004.508 1.582 0 .504-.252.965-.557 1.383-.167.244-.387.469-.661.674 0 0-1.793 1.15-2.58 2.074-.456.535-.497 1.338-.538 2.488-.002.082.029.252.315.252h2.571c.256 0 .309-.189.312-.274.018-.418.064-.633.141-.875.144-.457.538-.855.979-1.199l.91-.627c.822-.641 1.477-1.166 1.767-1.578.494-.676.842-1.51.842-2.5-.001-1.615-.571-2.832-1.711-3.656zM9.741 14.924c-1.139-.035-2.079.754-2.115 1.99-.035 1.234.858 2.051 1.998 2.084 1.189.035 2.104-.727 2.141-1.963.034-1.236-.834-2.076-2.024-2.111z'
                  />
                </svg>
              )}
            </div>
            <div
              onClick={() => {
                if (
                  window.confirm(
                    'Are you sure you wish to delete this notification method?'
                  )
                ) {
                  deleteMethod(method.id)
                }
              }}
              className='self-start ml-2 -mt-3 -mr-3'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                className='fill-current h-4'
              >
                <path d='M14.348 14.849c-.469.469-1.229.469-1.697 0L10 11.819l-2.651 3.029c-.469.469-1.229.469-1.697 0-.469-.469-.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-.469-.469-.469-1.228 0-1.697s1.228-.469 1.697 0L10 8.183l2.651-3.031c.469-.469 1.228-.469 1.697 0s.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c.469.469.469 1.229 0 1.698z' />
              </svg>
            </div>
          </div>
          {!method.confirmed && <ConfirmMethod method={method} />}
        </div>
      ))}
    </div>
  )
}

export default ListNotificationMethods
