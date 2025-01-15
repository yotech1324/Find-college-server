import { Request, Response } from 'express'
import asyncHandler from '@expresso/helpers/asyncHandler'
import routes from 'routes/public'
import Authorization from 'middlewares/Authorization'
import BuildResponse from '@expresso/modules/Response/BuildResponse'
import StatesService from 'controllers/States/service'
import { formatDateGenerateFile } from '@expresso/helpers/Date'

routes.get(
  '/states',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const data = await StatesService.getAll(req)
    const buildResponse = BuildResponse.get(data)

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/states/generate-excel',
  Authorization,
  asyncHandler(async function generateExcelEvent(req: Request, res: Response) {
    const streamExcel = await StatesService.generateExcel(req)
    const dateNow = formatDateGenerateFile(new Date())
    const filename = `${dateNow}_generate_states.xlsx`

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
  '/states/:id',
  Authorization,
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()

    const data = await StatesService.getOne(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/states',
  Authorization,
  asyncHandler(async function createData(req: Request, res: Response) {
    const formData = req.getBody()

    const data = await StatesService.create(formData)
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)

routes.put(
  '/states/:id',
  Authorization,
  asyncHandler(async function updateData(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = req.getBody()

    const data = await StatesService.update(id, formData)
    const buildResponse = BuildResponse.updated({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.delete(
  '/states/:id',
  Authorization,
  asyncHandler(async function deleteData(req: Request, res: Response) {
    const { id } = req.getParams()

    await StatesService.delete(id)
    const buildResponse = BuildResponse.deleted({})

    return res.status(200).json(buildResponse)
  })
)
