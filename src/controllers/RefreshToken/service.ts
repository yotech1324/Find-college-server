import ms from 'ms'
import models from 'models'
import jwt from 'jsonwebtoken'
import ResponseError from '@expresso/modules/Response/ResponseError'
import useValidation from '@expresso/hooks/useValidation'
import {
  RefreshTokenAttributes,
  verifyRefreshTokenAttributes,
} from 'models/RefreshToken'
import UserService from 'controllers/User/service'
import { verifyRefreshToken } from '@expresso/helpers/Token'
import { isObject } from 'lodash'
import refreshTokenSchema from './schema'

const { RefreshToken } = models

const { JWT_SECRET_ACCESS_TOKEN }: any = process.env
const JWT_ACCESS_TOKEN_EXPIRED = process.env.JWT_ACCESS_TOKEN_EXPIRED || '1d'

const expiresIn = ms(JWT_ACCESS_TOKEN_EXPIRED) / 1000

class RefreshTokenService {
  /**
   *
   * @param id
   */
  public static async getToken(token: string) {
    const data = await RefreshToken.findOne({ token })

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  /**
   *
   * @param formData
   */
  public static async create(formData: RefreshTokenAttributes) {
    const value = useValidation(refreshTokenSchema.create, formData)
    const user = await UserService.getOne(formData.UserId)

    if (user) {
      const data = await RefreshToken.create(value)
      return data
    }

    throw new ResponseError.BadRequest('Something went wrong')
  }

  /**
   *
   * @param email
   * @param refreshToken
   */
  public static async getAccessToken(email: string, refreshToken: string) {
    if (!email || !refreshToken) {
      throw new ResponseError.BadRequest('invalid token')
    }

    const getToken = await this.getToken(refreshToken)
    const verifyToken = verifyRefreshToken(getToken.token)

    if (isObject(verifyToken?.data)) {
      // @ts-ignore
      const decodeToken: verifyRefreshTokenAttributes = verifyToken?.data

      if (email !== decodeToken?.email) {
        throw new ResponseError.BadRequest('email is not valid')
      }

      const payloadToken = {
        _id: decodeToken?._id,
        name: decodeToken?.name,
        email: decodeToken?.email,
        active: decodeToken?.active,
      }

      // Access Token
      const accessToken = jwt.sign(
        JSON.parse(JSON.stringify(payloadToken)),
        JWT_SECRET_ACCESS_TOKEN,
        {
          expiresIn,
        }
      )

      return { accessToken, expiresIn, tokenType: 'Bearer' }
    }

    // @ts-ignore
    throw new ResponseError.Unauthorized(`${verifyToken?.message}`)
  }

  /**
   *
   * @param id
   */
  public static async delete(id: string) {
    await RefreshToken.deleteMany({
      UserId: id,
    })
  }
}

export default RefreshTokenService
