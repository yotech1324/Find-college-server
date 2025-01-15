import request from 'supertest'
// @ts-ignore
import app from '../../../app'

jest.useFakeTimers()

describe('Get Country Routes', () => {
  it('should be get all country data', (done) => {
    request(app)
      .get('/v1/country')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done)
  })
})
