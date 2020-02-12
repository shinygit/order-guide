import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import jwt_decode from 'jwt-decode'

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
      localStorage.setItem('id', jwt_decode(token).id)
      localStorage.setItem('user', jwt_decode(token).username)
      localStorage.setItem('token', token)
      history.push('/')
    }
  }

  return (
    <div>
      <p>
        Don't have an account? <Link to='/register'>Register.</Link>
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            onChange={({ target }) => setEmail(target.value)}
            value={email}
            error='no error'
            id='email'
            type='text'
          />
          <label htmlFor='email'>Email</label>
        </div>
        <div>
          <input
            onChange={({ target }) => setPassword(target.value)}
            value={password}
            error='no error'
            id='password'
            type='password'
          />
          <label htmlFor='password'>Password</label>
        </div>
        <div>{error && error.message}</div>
        <div>
          <button disabled={loading} type='submit'>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
