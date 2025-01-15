import { NextFunction, Request, Response } from 'express'
import { currentToken, verifyAccessToken } from '@expresso/helpers/Token'
import { isEmpty } from 'lodash'
import ResponseError from '@expresso/modules/Response/ResponseError'
import { ACCESS_DENIED } from 'config/messageManager'

async function Authorization(req: Request, res: Response, next: NextFunction) {
  const getToken = currentToken(req)
  const token = verifyAccessToken(getToken)

  if (isEmpty(token?.data)) {
    return res.status(401).json({
      code: 401,
      message: token?.message,
    })
  }

  req.setState({ userLogin: token?.data })
  // if (token.data.role == null || token.data.role === undefined) {
  //   throw new ResponseError.Unauthorized(ACCESS_DENIED.message)
  // }
  next()
}

export default Authorization
