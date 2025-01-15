import { Request, Response } from 'express'
import asyncHandler from '@expresso/helpers/asyncHandler'
import routes from 'routes/public'
import Authorization from 'middlewares/Authorization'
import AccessControl from 'middlewares/AccessControl'
import BuildResponse from '@expresso/modules/Response/BuildResponse'
import UserService from 'controllers/User/service'
import useMulter from '@expresso/hooks/useMulter'
import { writeFileFromBase64 } from '@expresso/helpers/uploadBase64';

const upload = useMulter({})
function* values(obj:any) {
  for (let prop of Object.keys(obj)) // own properties, you might use
                                     // for (let prop in obj)
      yield obj[prop];
}
routes.get(
  '/user/:id',
  Authorization,
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()

    const data = await UserService.getOne(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/user',
  Authorization,
  asyncHandler(async function createData(req: Request, res: Response) {
    const formData = req.getBody()

    const data = await UserService.create(formData)
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)
