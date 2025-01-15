import bcrypt from 'bcrypt'
import { Schema, model, Document, Date } from 'mongoose'
import userSchema from 'controllers/User/schema'
import { FILE_UPLOAD_URL_SERVER } from 'config/baseURL'
import { boolean } from 'joi'
// { type: Schema.Types.ObjectId, ref: 'User' }
export interface UserAttributes {
  fullName: string
  email: string
  phone: string
  password?: string | null
  isEmailVerified?: boolean | null
  isPhoneVerified?: boolean | null
  active?: boolean | null
  tokenVerify?: string | null
  newPassword?: string
  confirmNewPassword?: string
  role?: number
  image?: string
  createdAt?: Date
  updatedAt?: Date
}


export interface TokenAttributes {
  data: UserAttributes
  message: string
}

export interface LoginAttributes {
  email: string
  password: string
}

export interface EmailAttributes {
  email: string | any
  fullName: string
}
export function setUserPassword(instance: UserAttributes) {
  const { newPassword, confirmNewPassword } = instance
  const fdPassword = { newPassword, confirmNewPassword }
  // const validPassword = userSchema.createPassword.validateSyncAt(
  //   'confirmNewPassword',
  //   fdPassword
  // )
  const saltRounds = 10
  // @ts-ignore
  const hash = bcrypt.hashSync(newPassword, saltRounds)
  const password = hash
  return password
}


interface UserCreationAttributes extends UserAttributes, Document {}

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: '' },
    password: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false, required: true },
    isPhoneVerified: { type: Boolean, default: false, required: true },
    active: { type: Boolean, default: false, required: true },
    tokenVerify: { type: String, required: true },
    role: { type: Number, required: true, default:4 },
    image: { type: String, default: '' },
  },
  { timestamps: true }
)

UserSchema.methods.comparePassword = function (
  candidatePassword: string,
  password: string
) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, password, function (err, isMatch) {
      if (err) {
        reject(err)
      }

      resolve(isMatch)
    })
  })
}

const User = model<UserCreationAttributes>('Users', UserSchema, 'users')

export default User


// db.getCollection("user_education").updateMany({user_id:'bablushaw1988@gmail.com'},{$set:{user_id:'610aac8db805e239fc6c0e77'}})
