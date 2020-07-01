import redis from 'redis'
import { promisify } from 'util'
require('dotenv').config()

const client = redis.createClient(process.env.REDIS_URL)
const incrAsync = promisify(client.incr).bind(client)
const expireAsync = promisify(client.expire).bind(client)
const keysAsync = promisify(client.keys).bind(client)
const ttlAsync = promisify(client.ttl).bind(client)
const delAsync = promisify(client.del).bind(client)

client.on('connect', function () {
  console.log('Redis client connected')
})

client.on('error', function (err) {
  console.log('Something went wrong ' + err)
})

export default { incrAsync, expireAsync, keysAsync, ttlAsync, delAsync }
