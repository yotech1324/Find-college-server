import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'express-validation'

async function ExpressErrorJoi(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ValidationError) {
    console.log('ERROR JOI VALIDATION!!!')
    const error = {
      code: 422,
      message: err.details,
      errors: err.error,
    }
    return res.status(422).json(error)
  }

  next(err)
}

export default ExpressErrorJoi
