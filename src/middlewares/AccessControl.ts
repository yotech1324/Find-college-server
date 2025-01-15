import { NextFunction, Request, Response } from 'express';
import { ACCESS_DENIED } from 'config/messageManager';

let accessApi:any = {
  4:[],
  3:['get-user'],
  2:['get-user','create-user-coupon','update-active-log','domain-live'],
  1:['get-user','delete-user','assign-role','create-user-coupon','update-active-log','domain-live']
}

/*function AccessControl(apiName: String) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userLogin = req.getState('userLogin')
    const { role } = userLogin
    if (!role) {
      throw new ResponseError.Unauthorized(ACCESS_DENIED.message)
    }
    const data = await RoleService.getOneByQuery({ rid: role })
    if (!data) {
      throw new ResponseError.Unauthorized(ACCESS_DENIED.message)
    }
    // if (data.api.findIndex(apiName) === -1) {
    //   throw new ResponseError.Unauthorized(ACCESS_DENIED.message)
    // }
    return next()
  }
}*/

function AccessControl(apiName: String) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userLogin = req.getState('userLogin')
    const { role } = userLogin
    if (!role) {
      return res.status(403).json({
        code: 403,
        message: ACCESS_DENIED.message,
      })
    }
    if (!accessApi[role].includes(apiName)) {
      return res.status(403).json({
        code: 403,
        message: ACCESS_DENIED.message,
      })
    }
    return next()
  }
}

export default AccessControl
