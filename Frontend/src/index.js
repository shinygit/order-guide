import React from 'react'
import ReactDOM from 'react-dom'
import './assets/styles/main.css'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { resolvers, typeDefs } from './resolvers/Item.js'
import Routes from './components/Welcome/Routes'
import * as serviceWorker from './serviceWorker'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link'

import { BrowserRouter as Router } from 'react-router-dom'
if (module.hot) {
  module.hot.accept()
}

const httpLink = new HttpLink({
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      'x-token': token ? `${token}` : '',
    },
  }
})
const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
      return null
    })
  }
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.extensions.code) {
        case 'UNAUTHENTICATED':
          localStorage.clear()
          break
        default:
      }
    }
  }
  if (networkError) console.log(`[Network error]: ${networkError}`)
})
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [], // no types provided
    },
  },
})
const Link = ApolloLink.from([onErrorLink, authLink, httpLink])
const cache = new InMemoryCache({ fragmentMatcher, freezeResults: true })
export const client = new ApolloClient({
  link: Link,
  cache,
  typeDefs,
  resolvers,
})

const data = {
  filter: {
    searchTerm: '',
    filterType: 'ALL',
    filterName: 'ALL',
    hideAllZeroOrderAmount: false,
    __typename: 'Filter',
  },
}
cache.writeData({ data })

client.onResetStore(() => cache.writeData({ data }))
ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Routes />
    </Router>
  </ApolloProvider>,

  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
