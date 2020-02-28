import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import jwt_decode from 'jwt-decode'
import { client } from '../..'

const LOGIN = gql`
  mutation signIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      token
    }
  }
`

const Login = () => {
  const [login, { loading, error }] = useMutation(LOGIN)
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async event => {
    event.preventDefault()
    const result = await login({
      variables: { login: email, password: password }
    }).catch(e => {
      console.log(e)
    })
    if (result) {
      const token = result.data.signIn.token
      localStorage.setItem('token', token)
      localStorage.setItem('id', jwt_decode(token).id)
      localStorage.setItem('email', jwt_decode(token).email)
      client.writeData({
        data: {
          isLoggedIn: true
        }
      })
      history.push('/')
    }
  }
  return (
    <div className='flex justify-center pt-10 bg-gray-100 h-screen'>
      <div className='w-full max-w-xs'>
        <p className='text-center mb-1'>
          Don't have an account?{' '}
          <Link className='font-bold text-blue-500' to='/register'>
            Register.
          </Link>
        </p>
        <form
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          onSubmit={handleSubmit}
        >
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email
            </label>
            <input
              className={emailFormStyle}
              onChange={({ target }) => setEmail(target.value)}
              value={email}
              id='email'
              type='text'
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <input
              className={passwordFormStyle}
              onChange={({ target }) => setPassword(target.value)}
              value={password}
              id='password'
              type='password'
            />
          </div>
          <p className='text-red-500 text-s italic'>
            {error && error.message.split('GraphQL error: ')[1]}
          </p>
          <div>
            <button
              className='bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              disabled={loading}
              type='submit'
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
const emailFormStyle =
  'bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-60'
const passwordFormStyle =
  'bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-60'
export default Login
