import { Schema, model, Document } from 'mongoose'

export interface StatesAttributes {
  name: string
  country_code: string
  code: string
  createdAt?: Date
  updatedAt?: Date
}

interface StatesCreationAttributes extends StatesAttributes, Document {}

const StatesSchema = new Schema(
  {
    name: { type: String, required: true },
    country_code: { type: String, required: true },
    code: { type: String, required: true },
  },
  { timestamps: true }
)

const States = model<StatesCreationAttributes>('States',  StatesSchema,  'States');

export default States
