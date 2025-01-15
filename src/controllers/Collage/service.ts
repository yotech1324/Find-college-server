/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import { Request } from 'express'
import models, { FilterQueryAttributes } from 'models'
import { filterQueryObject } from '@expresso/modules/MongoQuery/queryObject'
import ResponseError from '@expresso/modules/Response/ResponseError'
import useValidation from '@expresso/hooks/useValidation'
import { CollageAttributes } from 'models/Collage'
import ExcelHelper from '@expresso/helpers/Excel'
import collageSchema from './schema'

const { Collage } = models

class CollageService {
  /**
   *
   * @param req - Request
   */
  public static async getAll(req: Request) {
    let { page, pageSize, filtered, sorted }: FilterQueryAttributes =
      req.getQuery()

    if (!page) page = 0
    if (!pageSize) pageSize = 10
    const filterObject = filtered ? filterQueryObject(JSON.parse(filtered)) : {}

    const data = await Collage.find(filterObject)
      .limit(Number(pageSize))
      .skip(Number(pageSize) * Number(page))
      .sort({ createdAt: 'asc' })

    const total = await Collage.countDocuments(filterObject)

    return { message: `${total} data has been received.`, data, total }
  }

  /**
   *
   * @param id
   */
  public static async getOne(id: string) {
    const data = await Collage.findById(id)

    if (!data) {
      throw new ResponseError.NotFound(
        'collage data not found or has been deleted'
      )
    }

    return data
  }

  /**
   *
   * @param id
   */
  public static async getOneByQuery(query: any) {
    const data = await Collage.findOne(query)
    if (!data) {
      return null
    }
    return data
  }

  /**
   *
   * @param formData
   */
  public static async create(formData: CollageAttributes) {
    const value = useValidation(collageSchema.create, formData)
    const data = await Collage.create(value)

    return data
  }

  /**
   *
   * @param id
   * @param formData
   */
  public static async update(id: string, formData: CollageAttributes) {
    const data = await this.getOne(id)

    const value = useValidation(collageSchema.create, {
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
    const collageData = JSON.parse(JSON.stringify(data))

    const header = [
      { header: 'No', key: 'no', width: 5 },
      { header: 'Name', key: 'name', width: 20 },
    ]

    const newData = []
    for (let i = 0; i < collageData.length; i += 1) {
      const item = collageData[i]
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
    await Collage.findByIdAndRemove(id)
  }
}

export default CollageService
