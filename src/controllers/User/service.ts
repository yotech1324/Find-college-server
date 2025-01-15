/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
// https://www.freecodecamp.org/news/15-web-developer-portfolios-to-inspire-you-137fb1743cae/
// https://www.sliderrevolution.com/design/web-developer-portfolio-examples/
import { Request } from 'express'
import models, { FilterQueryAttributes } from 'models'
import { filterQueryObject,getFilter,getOrder } from '@expresso/modules/MongoQuery/queryObject'
import ResponseError from '@expresso/modules/Response/ResponseError'
import useValidation from '@expresso/hooks/useValidation'
import {
  setUserPassword,
  UserAttributes,
} from 'models/User'
const moment = require('moment');
import { SERVICE_EXPIRED, ACCESS_DENIED } from 'config/messageManager'
import userSchema from './schema'

const {
  User

} = models
const populates = [{ path: 'Role' }]

class UserService {

  /**
   *
   * @param id
   */
  public static async getOne(id: string) {
    const data = await User.findById(id).select('-password -tokenVerify');
    if (!data) {
      throw new ResponseError.NotFound(
        'user data not found or has been deleted'
      )
    }
    return data;
  }

  /**
   *
   * @param email
   */
  public static async validateUserByEmail(email: string) {
    const data = await User.findOne({ email }).select('-password -tokenVerify')

    if (data) {
      throw new ResponseError.NotFound('email address already in use')
    }

    return null
  }

  /**
   *
   * @param formData
   */
  public static async create(formData: UserAttributes) {
    const password = setUserPassword(formData);
    const newFormData = {
      ...formData,
      password,
    }
    // const value = useValidation(userSchema.create, newFormData)
    let data = await User.create(newFormData)
    return data
  }

  public static async getAccountNo() {
    const prefix='MWS';
    return prefix + new Date().getTime();
  }
  /**
   *
   * @param id
   * @param formData
   */
   public static async update(id: string, formData: UserAttributes) {
    const data = await this.getOne(id)
    const value = {
      ...data.toJSON(),
      ...formData,
    }
    await data.updateOne(value || {})

    return data
  }

  /**
   *
   * @param id
   * @param formData
   */
   public static async assignRole(id: string, formData: UserAttributes) {
    const data = await this.getOne(id)
    const value = {
      ...data.toJSON(),
      ...formData,
    }
    await data.updateOne(value || {})
    return data
  }

  /**
   *
   * @param id
   */
  public static async delete(id: string) {
    await User.findByIdAndRemove(id)
  }
}


export default UserService
