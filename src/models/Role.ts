import { Schema, model, Document } from 'mongoose'

export interface RoleAttributes {
  name: string
  uid: number
  api: []
  createdAt?: Date
  updatedAt?: Date
}

interface RoleCreationAttributes extends RoleAttributes, Document {}

const RoleSchema = new Schema(
  {
    name: { type: String, required: true },
    uid: { type: Number, required: true, unique:true },
    api: { type: Array, default: [] },
  },
  { timestamps: true }
)

const Role = model<RoleCreationAttributes>('Roles', RoleSchema)

export default Role
