import Role from 'models/Role'
import User from 'models/User'
import RefreshToken from 'models/RefreshToken'
import Collage from 'models/Collage'
import Course from 'models/Course'
import CourseSpecification from 'models/CourseSpecification'
import Country from 'models/Country'
import States from 'models/States'
export interface FilterAttributes {
  id: string
  value: string
}

export interface SortAttributes {
  id: string
  desc: string
}

export interface FilterQueryAttributes {
  page: string | number
  pageSize: string | number
  filtered: string
  sorted: string
}

export default {
  Role,
  User,
  RefreshToken,
  Collage,
  Course,
  CourseSpecification,
  Country,
  States
}
