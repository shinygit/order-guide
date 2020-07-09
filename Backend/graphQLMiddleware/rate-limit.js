import redis from './../redis'
import { skip } from 'graphql-resolvers'

const TWO_HOUR = 60 * 60 * 2

export const rateLimit = (limit = 5) => async (parent, args, { req }, info) => {
  const key = `rate-limit:${info.fieldName}:${req.ip}`
  const current = await redis.incrAsync(key)
  await redis.expireAsync(key, TWO_HOUR)

  if (current > limit) {
    return { passwordError: 'Just stop trying...' }
  }
  return skip
}

export const clearRateLimit = async (req, info) => {
  const key = `rate-limit:${info.fieldName}:${req.ip}`
  await redis.delAsync(key)
}
