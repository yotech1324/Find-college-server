import fs from 'fs'
import { isEmpty } from 'lodash'
import path from 'path'
import ResponseError from '@expresso/modules/Response/ResponseError'
import slugify from 'slugify'
import { FILE_UPLOAD_URL_SERVER } from 'config/baseURL'

/**
 *
 * @param base64Data
 * @param filePath
 */
 function writeFileFromBase64(base64Data: string, module: string, filename:string) {
    let matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if(!matches){
        throw new ResponseError.NotFound('Invalid input image')
    }
    if (matches.length !== 3) {
        throw new ResponseError.NotFound('Invalid input image')
    }
    const slugFilename:string = slugify(filename, {
        replacement: '_',
        lower: true,
      })
    filename = [Date.now(), slugFilename].join('-');
    const uploadpath = process.env.FILE_UPLOAD_DEFAULT_DESTINATION+module+'/';
    const filePath = uploadpath+filename;
    const bufferData = Buffer.from(matches[2], 'base64');
    const outputfilepath = `${FILE_UPLOAD_URL_SERVER}${module}/${filename}`
    if (fs.existsSync(path.resolve(filePath))) {
        console.log('file exist, location... ', filePath)
        throw new ResponseError.NotFound('file exist, location... '+filePath)
    }

    console.log('file not exist, creating file... ', filePath)
    fs.writeFileSync(filePath, bufferData)
    return outputfilepath
}


export { writeFileFromBase64 }
