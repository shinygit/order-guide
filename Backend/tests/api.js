import axios from 'axios'
const API_URL = 'http://localhost:3001/graphql'

export const user = async variables =>
  axios.post(API_URL, {
    query: `
      query ($id: ID!) {
        user(id: $id) {
          id
          username
          email
        }
      }
    `,
    variables
  })
