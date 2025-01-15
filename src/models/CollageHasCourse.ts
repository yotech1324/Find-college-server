import { Schema, model, Document } from 'mongoose'

export interface CollageHasCourseAttributes {
  collage_id: string
  course_id: string
  course_fee:number
  course_fee_details:string
  createdAt?: Date
  updatedAt?: Date
}

interface CollageHasCourseCreationAttributes
  extends CollageHasCourseAttributes,
    Document {}

const CollageHasCourseSchema = new Schema(
  {
    collage_id: { type: Schema.Types.ObjectId, required: true },
    course_id: { type: Number, required: true },
    course_fee: { type: Number, required: true },
    course_fee_details: { type: Number, required: true },
  },
  { timestamps: true }
)

const CollageHasCourse = model<CollageHasCourseCreationAttributes>(
  'CollageHasCourses',
  CollageHasCourseSchema
)

export default CollageHasCourse
