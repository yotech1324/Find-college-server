import request from 'supertest'
// @ts-ignore
import app from '../../../app'

jest.useFakeTimers()

describe('Get CourseSpecification Routes', () => {
  it('should be get all course-specification data', (done) => {
    request(app)
      .get('/v1/course-specification')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done)
  })
})
