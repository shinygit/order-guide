import redis from './../redis'
import { skip } from 'graphql-resolvers'

export const log = async (parent, args, { req }, info) => {
  const key = `login: ${args.login}`
  await redis.incrAsync(key)
  return skip
}
