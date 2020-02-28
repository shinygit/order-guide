import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const REGISTER_USER = gql`
  mutation signUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      token
    }
  }
`

const Register = () => {
  const history = useHistory()
  const [signUp] = useMutation(REGISTER_USER)
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    password2: '',
    isSubmitting: false,
    errors: {}
  })

  const { errors } = registerForm

  const handleChangeInput = event => {
    setRegisterForm({
      ...registerForm,
      [event.target.id]: event.target.value
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (registerForm.password !== registerForm.password2) {
      setRegisterForm({
        ...registerForm,
        errors: { password2: 'Passwords must match.' }
      })
      return
    }
    setRegisterForm({
      ...registerForm,
      isSubmitting: true
    })
    const result = await signUp({
      variables: {
        email: registerForm.email,
        password: registerForm.password
      }
    }).catch(e => {
      setRegisterForm({
        ...registerForm,
        isSubmitting: false
      })
      console.log(e)
    })

    if (result) {
      history.push('/login')
    }
  }

  return (
    <div className='flex justify-center pt-1 bg-gray-100 h-max'>
      <div className='w-full max-w-xs'>
        <p className='text-center mb-1'>
          Already have an account?{' '}
          <Link className='font-bold text-blue-500' to='/login'>
            Login.
          </Link>
        </p>
        <form
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          onSubmit={handleSubmit}
        >
          <div className='mb-4'>
            <label htmlFor='email'>Email</label>
            <input
              className={formField}
              onChange={handleChangeInput}
              value={registerForm.email}
              error={errors.email}
              id='email'
              type='text'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password'>Password</label>
            <input
              className={formField}
              onChange={handleChangeInput}
              value={registerForm.password}
              error={errors.password}
              id='password'
              type='password'
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='password'>Confirm Password</label>
            <input
              className={formField}
              onChange={handleChangeInput}
              value={registerForm.password2}
              error={errors.password2}
              id='password2'
              type='password'
            />
          </div>
          <div>
            <button
              className='bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              disabled={registerForm.isSubmitting}
              type='submit'
            >
              {registerForm.isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const formField =
  'bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-60'

export default Register
