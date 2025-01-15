import { Schema, model, Document } from 'mongoose'

export interface CourseSpecificationAttributes {
  name: string
  course_id: number
  createdAt?: Date
  updatedAt?: Date
}

interface CourseSpecificationCreationAttributes
  extends CourseSpecificationAttributes,
    Document {}

const CourseSpecificationSchema = new Schema(
  {
    name: { type: String, required: true },
    course_id: { type: Number, required: true },
  },
  { timestamps: true }
)

const CourseSpecification = model<CourseSpecificationCreationAttributes>(
  'CourseSpecification',
  CourseSpecificationSchema,
  'course_specification'
)

export default CourseSpecification
