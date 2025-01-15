import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from '@expresso/helpers/asyncHandler'
import Authorization from 'middlewares/Authorization'
import BuildResponse from '@expresso/modules/Response/BuildResponse'
import AuthService from 'controllers/Auth/service'
import RefreshTokenService from 'controllers/RefreshToken/service'
import { validate } from 'express-validation'
import authValidation from 'validations/auth'

routes.post(
  '/auth/sign-up',
  asyncHandler(async function signUp(req: Request, res: Response) {
    const formData = req.getBody()
    formData.email = formData.email.toString().toLowerCase();
    const data = await AuthService.signUp(formData)
    const buildResponse = BuildResponse.get(data)

    return res.status(201).json(buildResponse)
  })
)

routes.post(
  '/auth/sign-in',
  validate(authValidation.login),
  asyncHandler(async function signIn(req: Request, res: Response) {
    const formData = req.getBody()
    formData.email = formData.email.toString().toLowerCase();
    const {requestip,timezone} = req.getHeaders();
    const data = await AuthService.signIn(formData, {requestip, timezone})
    const buildResponse = BuildResponse.get(data)

    return res
      .cookie('token', data.accessToken, {
        maxAge: Number(data.expiresIn) * 1000, // 7 Days
        httpOnly: true,
        path: '/v1',
        secure: process.env.NODE_ENV === 'production',
      })
      .json(buildResponse)
  })
)
