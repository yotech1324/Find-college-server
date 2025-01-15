/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import { Request } from 'express'
import models, { FilterQueryAttributes } from 'models'
import ResponseError from '@expresso/modules/Response/ResponseError'
import useValidation from '@expresso/hooks/useValidation'
import { CourseSpecificationAttributes } from 'models/CourseSpecification'
import ExcelHelper from '@expresso/helpers/Excel'
import { getFilter, getOrder } from '@expresso/modules/MongoQuery/queryObject'
import courseSpecificationSchema from './schema'

const { CourseSpecification } = models

class CourseSpecificationService {
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
    const data = await CourseSpecification.find(filterObject).sort(orderObject)
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
      data = await CourseSpecification.findById(query.id)
    } else {
      data = await CourseSpecification.findOne(query)
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
  public static async create(formData: CourseSpecificationAttributes) {
    const value = useValidation(courseSpecificationSchema.create, formData)
    const data = await CourseSpecification.create(value)

    return data
  }

  /**
   *
   * @param id
   * @param formData
   */
  public static async update(
    id: string,
    formData: CourseSpecificationAttributes
  ) {
    const data = await this.getOne(id)

    const value = useValidation(courseSpecificationSchema.create, {
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
    const courseSpecificationData = JSON.parse(JSON.stringify(data))

    const header = [
      { header: 'No', key: 'no', width: 5 },
      { header: 'Name', key: 'name', width: 20 },
    ]

    const newData = []
    for (let i = 0; i < courseSpecificationData.length; i += 1) {
      const item = courseSpecificationData[i]
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
    await CourseSpecification.findByIdAndRemove(id)
  }
}

export default CourseSpecificationService
