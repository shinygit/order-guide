import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const REGISTER_USER = gql`
  mutation signUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      ... on RegisterErrors {
        emailError
        passwordError
      }
      ... on User {
        email
      }
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

  // const { errors } = registerForm

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
        errors: { passwordError: 'Passwords must match.' }
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
    console.log(result)
    if (result.data.signUp.emailError || result.data.signUp.passwordError) {
      setRegisterForm({
        ...registerForm,
        errors: result.data.signUp,
        isSubmitting: false
      })
    }
    if (result.data.signUp.email) {
      history.push('/login')
    }
  }

  return (
    <div className='flex justify-center flex-col items-center bg-gray-100 h-max'>
      <div className='flex justify-between items-center py-3 mb-5 bg-blue-800 w-full'>
        <div className='flex flex-row items-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-10 w-10 ml-5 text-gray-100 fill-current'
            viewBox='0 0 32 32'
          >
            <path d='M12,5 L12,3.99791312 C12,2.89826062 12.897616,2 14.0048815,2 L14.9951185,2 C16.1061002,2 17,2.89449617 17,3.99791312 L17,5 L19.0044225,5 C19.555163,5 20,5.44724809 20,5.99895656 L20,7.00104344 C20,7.55733967 19.5542648,8 19.0044225,8 L9.9955775,8 C9.44483697,8 9,7.55275191 9,7.00104344 L9,5.99895656 C9,5.44266033 9.44573523,5 9.9955775,5 L12,5 L12,5 Z M11.0000005,4 L10.0027601,4 C8.89828672,4 8.00262776,4.89128252 8.00000577,6 L6.99742191,6 C5.89427625,6 5,6.88976324 5,8.00359486 L5,28.9964051 C5,30.10296 5.89092539,31 6.99742191,31 L22.0025781,31 C23.1057238,31 24,30.1102368 24,28.9964051 L24,8.00359486 C24,6.89703997 23.1090746,6 22.0025781,6 L20.9999942,6 L20.9999942,6 C20.9973726,4.89497907 20.1048269,4 18.9972399,4 L17.9999995,4 C17.9990959,2.34299141 16.6497738,1 14.9907455,1 L14.0092545,1 C12.3478441,1 11.0008998,2.33812603 11.0000005,4 L11.0000005,4 L11.0000005,4 Z M20.9999942,7 L22.0000398,7 C22.5452911,7 23,7.44908998 23,8.00307055 L23,28.9969294 C23,29.5610822 22.5523026,30 22.0000398,30 L6.9999602,30 C6.45470893,30 6,29.55091 6,28.9969294 L6,8.00307055 C6,7.43891776 6.44769743,7 6.9999602,7 L8.00000579,7 C8.00262739,8.10502093 8.89517314,9 10.0027601,9 L18.9972399,9 C20.1017133,9 20.9973722,8.10871748 20.9999942,7 L20.9999942,7 L20.9999942,7 Z M14.5,5 C14.7761424,5 15,4.77614239 15,4.5 C15,4.22385761 14.7761424,4 14.5,4 C14.2238576,4 14,4.22385761 14,4.5 C14,4.77614239 14.2238576,5 14.5,5 L14.5,5 Z M13.253553,23.6852821 L21.0317276,15.9071075 L20.3246208,15.2000008 L13.253553,22.2710686 L9.51091232,18.5284279 L8.80380554,19.2355347 L13.253553,23.6852821 L13.253553,23.6852821 Z' />{' '}
          </svg>
          <span className='ml-1 text-xl text-gray-100 font-semibold invisible sm:visible'>
            Build-To Order Guides
          </span>
        </div>
      </div>
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
              className={`${formFieldStyle} ${
                registerForm.errors.emailError ? formErrorStyle : ''
              }`}
              onChange={handleChangeInput}
              onFocus={() =>
                setRegisterForm({
                  ...registerForm,
                  errors: {}
                })
              }
              value={registerForm.email}
              id='email'
              type='text'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password'>Password</label>
            <input
              className={`${formFieldStyle} ${
                registerForm.errors.passwordError ? formErrorStyle : ''
              }`}
              onChange={handleChangeInput}
              onFocus={() =>
                setRegisterForm({
                  ...registerForm,
                  errors: {}
                })
              }
              value={registerForm.password}
              id='password'
              type='password'
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='password'>Confirm Password</label>
            <input
              className={`${formFieldStyle} ${
                registerForm.errors.passwordError ? formErrorStyle : ''
              }`}
              onChange={handleChangeInput}
              onFocus={() =>
                setRegisterForm({
                  ...registerForm,
                  errors: {}
                })
              }
              value={registerForm.password2}
              id='password2'
              type='password'
            />
          </div>
          <p className='text-red-500 text-s italic'>
            {registerForm.errors.emailError ||
              registerForm.errors.passwordError}
          </p>
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
const formErrorStyle = 'bg-red-100 border-red-500'
const formFieldStyle =
  'bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-60'
export default Register
