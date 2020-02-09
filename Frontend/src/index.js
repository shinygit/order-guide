import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { resolvers, typeDefs } from './resolvers/Item.js'
import './index.css'
import LoginOrCreateAccount from './components/Welcome/LoginOrCreateAccount'
import 'typeface-roboto'
import * as serviceWorker from './serviceWorker'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

const httpLink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
  headers: { 'x-token': localStorage.token }
})

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })
  }

  if (networkError) console.log(`[Network error]: ${networkError}`)
})
const Link = ApolloLink.from([onErrorLink, httpLink])
const cache = new InMemoryCache({ freezeResults: true })
export const client = new ApolloClient({
  link: Link,
  cache,
  typeDefs,
  resolvers
})

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token')
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <LoginOrCreateAccount />
  </ApolloProvider>,

  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
