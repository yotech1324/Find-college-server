import { Schema, model, Document } from 'mongoose'

export interface CountryAttributes {
  name: string
  dial_code: string
  code: string
  createdAt?: Date
  updatedAt?: Date
}

interface CountryCreationAttributes extends CountryAttributes, Document {}

const CountrySchema = new Schema(
  {
    name: { type: String, required: true },
    dial_code: { type: String, required: true },
    code: { type: String, required: true },
  },
  { timestamps: true }
)

const Country = model<CountryCreationAttributes>(
  'Country',
  CountrySchema,
  'country'
)

export default Country
