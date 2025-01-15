import path from 'path'
import handlebars from 'handlebars'
import { readHTMLFile } from '@expresso/helpers/File'
import EmailProvider from '@expresso/providers/Email'
import ResponseError from '@expresso/modules/Response/ResponseError'
import { BASE_URL_CLIENT } from 'config/baseURL'

const { APP_NAME } = process.env

class SendMail {
  /**
   *
   * @param formData
   * @param token
   */
  public static AccountRegister(formData: any, token: string) {
    const { email, fullName }: any = formData
    const pathTemplate = path.resolve(
      __dirname,
      `../../../public/templates/emails/register.html`
    )

    const subject = 'Email Verification'
    const urlToken = `${BASE_URL_CLIENT}/verify-account/${token}`
    const dataTemplate = { APP_NAME, fullName, urlToken }
    const Email = new EmailProvider()

    readHTMLFile(pathTemplate, (error: Error, html: any) => {
      if (error) {
        throw new ResponseError.NotFound('email template not found')
      }

      const template = handlebars.compile(html)
      const htmlToSend = template(dataTemplate)

      Email.send(email, subject, htmlToSend)
    })
  }

  /**
   *
   * @param formData
   * @param token
   */
  public static changePassword(formData: any, token: string) {
    const { email, fullName }: any = formData
    const pathTemplate = path.resolve(
      __dirname,
      `../../../public/templates/emails/forgetpassword.html`
    )

    const subject = 'Change Password'
    const urlToken = `${BASE_URL_CLIENT}/change-password/${token}`
    const dataTemplate = { APP_NAME, fullName, urlToken }
    const Email = new EmailProvider()

    readHTMLFile(pathTemplate, (error: Error, html: any) => {
      if (error) {
        throw new ResponseError.NotFound('email template not found')
      }

      const template = handlebars.compile(html)
      const htmlToSend = template(dataTemplate)

      Email.send(email, subject, htmlToSend)
    })
  }
}

export default SendMail
