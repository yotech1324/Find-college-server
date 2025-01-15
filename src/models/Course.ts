import { Schema, model, Document } from 'mongoose'

export interface CourseAttributes {
  course_id: number
  course_name: string
  course_alias: string
  course_type: string
  courses_could_be: string
  stream_name: string
  duration_year: number
  duration_month: number
  level: string
  createdAt?: Date
  updatedAt?: Date
}

interface CourseCreationAttributes extends CourseAttributes, Document {}

const CourseSchema = new Schema(
  {
    course_id: { type: Number, required: true, unique: true },
    course_name: { type: String, required: true },
    course_alias: { type: String, required: true },
    course_type: { type: String, required: true },
    courses_could_be: { type: String, required: true },
    stream_name: { type: String, required: true },
    duration_year: { type: Number, required: true },
    duration_month: { type: Number, required: true },
    level: { type: String, required: true },
  },
  { timestamps: true }
)

const Course = model<CourseCreationAttributes>('Course', CourseSchema, 'course')

export default Course
