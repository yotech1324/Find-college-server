import request from 'supertest'
// @ts-ignore
import app from '../../../app'

jest.useFakeTimers()

describe('Get Course Routes', () => {
  it('should be get all course data', (done) => {
    request(app)
      .get('/v1/course')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done)
  })
})
