const { User, factory, request, app, expect, jw, jwt  } = require('../utils/helper');

describe ('AuthController', () => {
  beforeEach(async () => User.deleteMany())

  describe ('POST /auth/login', () => {
    it ('returns a valid jwt token', done => {
      const user = factory.create('user', { password: 'password' });

      user
        .then(u => {
          request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send({
              email: u.get('email'),
              password: 'password',
            })
            .expect(200)
            .then(res => {
              const decoded = jwt.verify(res.body.token, process.env.SECRET);
              expect(decoded.id).to.eq(u.get('_id').toString());
              done()
            })
            .catch(done)
        })

    })

    it ('returns an error message', done => {
      request(app)
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send({
          email: 'test@example.com',
          password: 'password',
        })
        .expect(400)
        .then(res => {
          expect(res.body.msg).to.eq("Invalid email or password")
          done()
        })
        .catch(done)
    })
  })

  describe ('DELETE /auth/logout', () => {
  })
})
