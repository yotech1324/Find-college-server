import redisClient from 'config/redisClient'
import { NextFunction, Request, Response } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import { TOO_MANY_REQUEST } from 'config/messageManager'

require('dotenv').config()

const RATE_LIMIT = Number(process.env.RATE_LIMIT) || 50

// Rate Limit Request
const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: RATE_LIMIT, // 10 requests
  duration: 1, // per 1 second by IP
})

async function ExpressRateLimit(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await rateLimiter.consume(req.ip)
    return next()
  } catch (err) {
    return res
      .status(TOO_MANY_REQUEST.code)
      .json({ code: TOO_MANY_REQUEST.code, message: TOO_MANY_REQUEST.message })
  }
}

export default ExpressRateLimit
