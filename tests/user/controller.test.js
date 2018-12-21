const app        = require('../../src/app');
const request    = require('supertest');
const User       = require('../../src/user');
const mongoose   = require('mongoose');
const { expect } = require('chai');

describe.only('User API', () => {
  beforeEach(done => {
      Promise.all([
        User.deleteMany()
      ])
      .then(() => done())
  })

  after(() => mongoose.disconnect())

  describe('GET /users', () => {
    context ('when not empty', () => {
      let user;

      beforeEach(done => {
        new User ({
            email: 'test@example.com',
            password: 'password',
          })
          .save()
          .then(u => {
            user = u;
            done();
          })
      })

      it ('returns all users', done => {
        request(app)
          .get('/users')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(res => {
            expect(res.body.length).to.eq(1);
            expect(res.body[0].email).to.eq(user.email);
            expect(res.body[0]._id).to.eq(user.get('_id').toString());
            done();
          })
          .catch(done)
      })
    })

    context ('when empty', () => {
      it ('returns an empty array',done => {
        request(app)
          .get('/users')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(res => {
            expect(res.body).to.deep.equal([]);
            done();
          })
          .catch(done)
      })
    })

  })
})
