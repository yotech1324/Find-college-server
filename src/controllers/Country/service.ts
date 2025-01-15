/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import { Request } from 'express'
import models, { FilterQueryAttributes } from 'models'
import {
  filterQueryObject,
  getFilter,
  getOrder,
} from '@expresso/modules/MongoQuery/queryObject'
import ResponseError from '@expresso/modules/Response/ResponseError'
import useValidation from '@expresso/hooks/useValidation'
import { CountryAttributes } from 'models/Country'
import ExcelHelper from '@expresso/helpers/Excel'
import countrySchema from './schema'

const { Country } = models

class CountryService {
  /**
   *
   * @param req - Request
   */
  public static async getAll(req: Request) {
    let { filtered, sorted } = req.getQuery()
    filtered = filtered ? JSON.parse(filtered) : {}
    sorted = sorted ? JSON.parse(sorted) : {}

    const filterObject: any = getFilter(filtered)
    const orderObject: any = getOrder(sorted)
    const data = await Country.find(filterObject).sort(orderObject)
    const total = data.length
    return { message: `${total} data has been received.`, data, total }
  }

  /**
   *
   * @param id
   */
  public static async getOne(query: any) {
    let data = null
    if (query && query.id) {
      data = await Country.findById(query.id)
    } else {
      data = await Country.findOne(query)
    }
    if (!data) {
      throw new ResponseError.NotFound(
        'country data not found or has been deleted'
      )
    }
    return data
  }

  /**
   *
   * @param formData
   */
  public static async create(formData: CountryAttributes) {
    const value = useValidation(countrySchema.create, formData)
    const data = await Country.create(value)

    return data
  }

  /**
   *
   * @param id
   * @param formData
   */
  public static async update(id: string, formData: CountryAttributes) {
    const data = await this.getOne(id)

    const value = useValidation(countrySchema.create, {
      ...data.toJSON(),
      ...formData,
    })

    await data.updateOne(value || {})

    return data
  }

  /**
   *
   * @param req - Request
   */
  public static async generateExcel(req: Request) {
    const { data } = await this.getAll(req)
    const countryData = JSON.parse(JSON.stringify(data))

    const header = [
      { header: 'No', key: 'no', width: 5 },
      { header: 'Name', key: 'name', width: 20 },
    ]

    const newData = []
    for (let i = 0; i < countryData.length; i += 1) {
      const item = countryData[i]
      newData.push({
        ...item,
      })
    }

    const stream: Buffer = await ExcelHelper.generate(header, newData)

    return stream
  }

  /**
   *
   * @param id
   */
  public static async delete(id: string) {
    await Country.findByIdAndRemove(id)
  }
}

export default CountryService
