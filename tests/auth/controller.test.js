const { User, Blacklist, factory, request, app, expect, jw, jwt  } = require('../utils/helper');

describe ('AuthController', () => {
  beforeEach(done  =>  {
    Promise.all([
        User.deleteMany(),
        Blacklist.deleteMany(),
      ])
      .then(() => done())
  })

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
    let token;

    beforeEach(done => {
      token = jwt.sign({ test: 'test' }, process.env.SECRET, { expiresIn: '1h' })
      done()
    });

    it ('logouts the user', done => {
      factory
        .create('user')
        .then(user => user.generateToken())
        .then(token => {
          request(app)
            .delete('/auth/logout')
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then(res => {
              expect(res.body.success).to.eq(true).to.eq(true)
              done()
            })
            .catch(done)
        })
    })

    context ('when token is invalid', () => {
      it ('raises an invalid token error', done => {
        request(app)
          .delete('/auth/logout')
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${token}`)
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.eq("Invalid token")
            done()
          })
          .catch(done)
      })
    })

    context ('when token is blacklisted', () => {
      it ('raises an invalid token error ', done => {
        factory
          .create('blacklist')
          .then(token => {
            request(app)
              .delete('/auth/logout')
              .set('Content-Type', 'application/json')
              .set('Authorization', `Bearer ${token.token}`)
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.eq('Invalid token');
                done()
              })
              .catch(done)
          })
      })
    })
  })
})
