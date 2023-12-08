const { describe, it, before, after } = require('mocha')
const supertest = require('supertest')
const assert = require('assert')
describe('API suite test', () => {
  let app
  before((done) => {
    app = require('./api')
    app.once('listening', done)
  })
  after(done => app.close(done))
  describe('/contact:get', () => {
    it('should request the contact route and return Http status 200', async () => {
      const respponse = await supertest(app)
        .get('/contact')
        .expect(200)
      assert.deepStrictEqual(respponse.text, 'contact us page')
    })
  })
  describe('/login:post', () => {
    it('should request the login route and return Http status 200', async () => {
      const respponse = await supertest(app)
        .post('/login')
        .send({
          username: 'rodrigomatos',
          password: '123'
        })
        .expect(200)
      assert.deepStrictEqual(respponse.text, 'Logged in successfully')
    })
    it('should request the login route and return Http status 400', async () => {
      const respponse = await supertest(app)
        .post('/login')
        .send({
          username: 'rodrigomatos',
          password: '1232'
        })
        .expect(401)
      assert.deepStrictEqual(respponse.text, 'Login failed!')
    })
    describe('/hi:get -404', () => {
      it('should request the hi route and return Http status 404', async () => {
        const respponse = await supertest(app)
          .get('/hi')
          .expect(404)
        assert.deepStrictEqual(respponse.text, 'Not Found')
      })
    })
  })
})
