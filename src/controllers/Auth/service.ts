import models from 'models'
import ms from 'ms'
import jwt from 'jsonwebtoken'
import { getUniqueCodev2 } from '@expresso/helpers/Common'
import { setUserPassword, LoginAttributes, UserAttributes } from 'models/User'
import useValidation from '@expresso/hooks/useValidation'
import createDirNotExist from 'utils/Directory'
import ResponseError from '@expresso/modules/Response/ResponseError'
import SendMail from '@expresso/helpers/SendEmail'
import UserService from 'controllers/User/service'
import RefreshTokenService from 'controllers/RefreshToken/service'
import {
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD,
  RESET_VERIFICATION_CODE,
  ACCOUNT_NOT_FOUND,
  INVALID_EMAIL_PWD,
  USER_NOT_ACTIVE,
  ACCOUNT_LOGOUT,
  EXPIRED_VERIFICATION_CODE,
  ACCOUNT_VERIFIED,
} from 'config/messageManager'
import { currentToken, verifyAccessToken } from '@expresso/helpers/Token'
import { isEmpty } from 'lodash'
import mongoose from 'mongoose'
import jsondata from './jsondata'

import authSchema from './schema'

const async = require('async')
require('dotenv').config()

const { User } = models

const { JWT_SECRET_ACCESS_TOKEN, JWT_SECRET_REFRESH_TOKEN }: any = process.env

const JWT_ACCESS_TOKEN_EXPIRED = process.env.JWT_ACCESS_TOKEN_EXPIRED || '1d' // 1 Days
const JWT_REFRESH_TOKEN_EXPIRED = process.env.JWT_REFRESH_TOKEN_EXPIRED || '30d' // 30 Days

const expiresIn = ms(JWT_ACCESS_TOKEN_EXPIRED) / 1000

/*
  Create the main directory
  The directory will be created automatically when logged in,
  because there is a directory that uses a User ID
*/
async function createDirectory(UserId: string) {
  const pathDirectory = [
    './public/uploads/csv',
    './public/uploads/excel',
    `./public/uploads/profile/${UserId}`,
  ]

  pathDirectory.map((x) => createDirNotExist(x))
}

class AuthService {
  /**
   *
   * @param formData
   */
  public static async signUp(formData: UserAttributes) {
    await UserService.validateUserByEmail(formData.email)

    const generateToken = {
      code: getUniqueCodev2(),
      email: formData.email,
    }

    const tokenRegister = jwt.sign(generateToken, JWT_SECRET_ACCESS_TOKEN, {
      expiresIn,
    })

    // const password = setUserPassword(formData)
    // const portfolioId = await UserService.getPortfolioId(formData.email);
    const newFormData = {
      ...formData
    }

    // const value = useValidation(authSchema.register, newFormData)
    const data = await UserService.create(newFormData)

    // Initial Send an e-mail
    SendMail.AccountRegister(formData, tokenRegister)
    const message =
      'We have sent an email to '+data.email+' confirm your email address. Click the link to activate your account' 
    return { data, message }
  }

  /**
   *
   * @param formData
   */
  public static async signIn(formData: LoginAttributes, headers : {
    requestip:string,
    timezone:string
  }) {
    const { email, password } = formData

    const userData = await User.findOne({ email }).select('-tokenVerify')

    if (!userData) {
      throw new ResponseError.NotFound(ACCOUNT_NOT_FOUND.message)
    }

    const { _id: UserId } = userData

    /* User active proses login */
    if (userData.active) {
      // @ts-ignore
      const comparePassword = await userData.comparePassword(
        password,
        userData.password
      )

      if (comparePassword) {
        // modif payload token
        const payloadToken = {
          _id: UserId,
          fullName: userData.fullName,
          email: userData.email,
          role: userData.role
        }

        // Access Token
        const accessToken = jwt.sign(
          JSON.parse(JSON.stringify(payloadToken)),
          JWT_SECRET_ACCESS_TOKEN,
          {
            expiresIn,
          }
        )

        return {
          message: 'Login successfully',
          accessToken,
          expiresIn,
          tokenType: 'Bearer',
          user: payloadToken,
        }
      }

      throw new ResponseError.BadRequest(INVALID_EMAIL_PWD.message)
    }

    /* User not active return error confirm email */
    throw new ResponseError.BadRequest(USER_NOT_ACTIVE.message)
  }

  /**
   *
   * @param userId
   */
  public static async logout(userId: string) {
    const userData = await UserService.getOne(userId)
    // remove refresh token by user id
    await RefreshTokenService.delete(userData.id)
    return ACCOUNT_LOGOUT.message
  }

  /**
   *
   * @param emial
   */
  public static async forgetPassword(email: string) {
    const userData = await User.findOne({ email }).select('-tokenVerify')

    if (!userData) {
      throw new ResponseError.NotFound(ACCOUNT_NOT_FOUND.message)
    }

    const { _id: UserId } = userData

    /* User active proses login */
    if (userData.active) {
      const generateToken = {
        code: getUniqueCodev2(),
        email: userData.email,
      }

      const tokenRegister = jwt.sign(generateToken, JWT_SECRET_ACCESS_TOKEN, {
        expiresIn,
      })
      const updateData: any = { tokenVerify: tokenRegister }
      const data = await UserService.update(userData._id, updateData)
      // send mail to change password **missing code
      SendMail.changePassword(userData, tokenRegister)
      return { data: null, message: RESET_PASSWORD.message }
    }

    /* User not active return error confirm email */
    throw new ResponseError.BadRequest(USER_NOT_ACTIVE.message)
  }

  public static async verifyAccount(token: string) {
    const tokenResult: any = verifyAccessToken(token)
    if (isEmpty(tokenResult?.data)) {
      throw new ResponseError.Unauthorized(tokenResult.message)
    }
    const { email } = tokenResult.data
    const userData = await User.findOne({ email })
    if (!userData) {
      throw new ResponseError.NotFound(ACCOUNT_NOT_FOUND.message)
    }
    if (userData.tokenVerify === token) {
      const updateData: any = { active: true }
      const data = await UserService.update(userData._id, updateData)
      return { data: null, message: ACCOUNT_VERIFIED.message }
    }
    throw new ResponseError.NotFound(EXPIRED_VERIFICATION_CODE.message)
  }

  public static async changePassword(formData: any) {
    const tokenResult: any = verifyAccessToken(formData.token)
    if (isEmpty(tokenResult?.data)) {
      throw new ResponseError.Unauthorized(tokenResult.message)
    }
    const { email } = tokenResult.data
    const userData = await User.findOne({ email })
    if (!userData) {
      throw new ResponseError.NotFound(ACCOUNT_NOT_FOUND.message)
    }
    if (!userData.active) {
      throw new ResponseError.NotFound(USER_NOT_ACTIVE.message)
    }
    if (userData.tokenVerify === formData.token) {
      const password = setUserPassword(formData)
      const updateData: any = { password }
      const data = await UserService.update(userData._id, updateData)
      return { data: null, message: RESET_PASSWORD_SUCCESS.message }
    }
    throw new ResponseError.NotFound(EXPIRED_VERIFICATION_CODE.message)
  }

  public static async resetVerificationCode(email: string) {
    const userData = await User.findOne({ email })
    if (!userData) {
      throw new ResponseError.NotFound(ACCOUNT_NOT_FOUND.message)
    }
    const generateToken = {
      code: getUniqueCodev2(),
      email: userData.email,
    }

    const tokenRegister = jwt.sign(generateToken, JWT_SECRET_ACCESS_TOKEN, {
      expiresIn,
    })
    const updateData: any = { tokenVerify: tokenRegister }
    const data = await UserService.update(userData._id, updateData)
    // send mail to change password **missing code
    // Initial Send an e-mail
    SendMail.AccountRegister(userData, tokenRegister)
    return { data: null, message: RESET_VERIFICATION_CODE.message }
  }

  public static insertdb() {}
}

export default AuthService
