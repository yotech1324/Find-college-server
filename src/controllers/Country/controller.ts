import { Request, Response } from 'express'
import asyncHandler from '@expresso/helpers/asyncHandler'
import routes from 'routes/public'
import Authorization from 'middlewares/Authorization'
import BuildResponse from '@expresso/modules/Response/BuildResponse'
import CountryService from 'controllers/Country/service'
import { formatDateGenerateFile } from '@expresso/helpers/Date'

routes.get(
  '/country',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const data = await CountryService.getAll(req)
    const buildResponse = BuildResponse.get(data)

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/country/generate-excel',
  Authorization,
  asyncHandler(async function generateExcelEvent(req: Request, res: Response) {
    const streamExcel = await CountryService.generateExcel(req)
    const dateNow = formatDateGenerateFile(new Date())
    const filename = `${dateNow}_generate_country.xlsx`

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`)
    res.setHeader('Content-Length', streamExcel.length)

    return res.send(streamExcel)
  })
)

routes.get(
  '/country/:id',
  Authorization,
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()

    const data = await CountryService.getOne(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/country',
  Authorization,
  asyncHandler(async function createData(req: Request, res: Response) {
    const formData = req.getBody()

    const data = await CountryService.create(formData)
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)

routes.put(
  '/country/:id',
  Authorization,
  asyncHandler(async function updateData(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = req.getBody()

    const data = await CountryService.update(id, formData)
    const buildResponse = BuildResponse.updated({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.delete(
  '/country/:id',
  Authorization,
  asyncHandler(async function deleteData(req: Request, res: Response) {
    const { id } = req.getParams()

    await CountryService.delete(id)
    const buildResponse = BuildResponse.deleted({})

    return res.status(200).json(buildResponse)
  })
)
