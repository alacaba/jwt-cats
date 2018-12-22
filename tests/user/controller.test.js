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

  describe('GET /users/:id', () => {
    context ('when user is found', () => {
      let user;
      beforeEach(done => {
        new User({
          email: 'test@example.com',
          password: 'password',
        })
        .save()
        .then(u => {
          user = u;
          done()
        })
      })

      it ('returns the user object', done => {
        const id = user.get('_id').toString();

        request(app)
          .get(`/users/${id}`)
          .set('Content-Type', 'application/json')
          .expect(200)
          .then(res => {
            expect(res.body._id).to.eq(id);
            expect(res.body.email).to.eq(user.get('email'));
            done();
          })
      })
    })

    context ('when user is not fonud', () => {
      it ('returns a 404 not found msg', done => {
        const sampleID = mongoose.Types.ObjectId();

        request(app)
          .get(`/users/${sampleID}`)
          .set('Content-Type', 'application/json')
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.eq("Not found")
            done()
          })
          .catch(done)
      })
    })
  })

  describe ('PUT /users/:id', () => {
    context ('updating existing user', () => {
      let user;

      beforeEach(done => {
        new User({
          email: 'test@example.com',
          password: 'password',
        })
        .save()
        .then(u => {
          user = u;
          done();
        })
      })

      it ('updates the user', done => {
        const id = user.get('_id').toString();
        const params = { email: 'bee@gmail.com' };

        request(app)
          .put(`/users/${id}`)
          .send(params)
          .set('Content-Type', 'application/json')
          .expect(200)
          .then(res => {
            expect(res.body._id).to.eq(id)
            expect(res.body.email).to.eq(params.email)
            done()
          })
          .catch(done)
      })
    })

    context ('updating non existent user', () => {
      it ('returns a not found error', done => {
        const id = mongoose.Types.ObjectId();

        request(app)
          .put(`/users/${id}`)
          .set('Content-Type', 'application/json')
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.eq("Not found")
            done()
          })
          .catch(done)
      })
    })
  })

  describe ('DELETE /users/:id', () => {
    context ('when user exists', () => {
      let user, id;

      beforeEach( done => {
        new User({
          email: 'test@example.com',
          password: 'password'
        })
        .save()
        .then(u => {
          id = u.get('_id').toString();
          user = u;
          done()
        })
      })

      it ('returns the deleted user', done => {
        const id = user.get('_id').toString();

        request(app)
          .delete(`/users/${id}`)
          .set('Content-Type', 'application/json')
          .expect(200)
          .then(res => {
            expect(res.body._id).to.eq(id);
            done()
          })

          .catch(done)
      })

      it ('deletes the user', done => {
        const users = User.find({});
        request(app)
          .delete(`/users/${id}`)
          .set('Content-Type', 'application/json')
          .expect(200)
          .then(res => {
            users.then(u => {
              const ids = u.map(_u => _u._id.toString());
              expect(ids).not.to.include(id)
              done()
            })
          });
      })
    })

    context ('when user does not exists', () => {
      it ('returns a not found error', done => {
        const id = mongoose.Types.ObjectId();

        request(app)
          .delete(`/users/${id}`)
          .set('Content-Type', 'application/json')
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.eq("Not found");
            done();
          })
          .catch(done)
      })
    })
  })
})
