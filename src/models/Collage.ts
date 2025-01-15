import { Schema, model, Document } from 'mongoose'
export interface CollageAttributes {
  name: string
  about:string
  description:string
  logo: string
  coverimage: string
  country:string
  state:string
  center:string
  institute_type: string
  affiliated_by:[]
  active: boolean
  createdAt?: Date
  updatedAt?: Date
}

interface CollageCreationAttributes extends CollageAttributes, Document {}

const CollageScheme = new Schema(
  {
    name: { type: String, required:true },
    about: { type: String, required:true },
    description: { type: String, required:true },
    logo: { type: String, required:true },
    coverimage: { type: String, required:true },
    country: { type: String, required:true },
    state: { type: String, required:true },
    center: { type: String, required:true },
    institute_type: { type: String, required:true },
    affiliated_by:{ type: Array, affiliated_by:[] },
    active: { type: Boolean,default:true }
  },
  { timestamps: true }
)
const Collage = model<CollageCreationAttributes>('Collage', CollageScheme, 'collage')
export default Collage
