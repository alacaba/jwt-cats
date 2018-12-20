require('dotenv').load();
const User     = require('../../src/user');
const mongoose = require('mongoose');
const db       = require('../../src/config/db');
const expect   = require('chai').expect;
const bcrypt = require('bcrypt');

describe('User', () => {
  beforeEach(done => {
    Promise.all([
      User.deleteMany(),
    ])
    .then(() => done())
  });

  after(() => mongoose.disconnect());

  it('creates a new user', done => {
    let user = new User({
      email: 'test@example.com',
      password: 'password',
    });

    user
      .save()
      .then(() => {
        User.countDocuments({}, (err, count) => {
          expect(count).to.eq(1);
          done()
        })
      });
  });

  context('email', () => {
    it ('is invalid without email', done => {
      let user = new User({});

      user
        .save()
        .catch(err => {
          const keys = Object.keys(err.errors);

          expect(keys).to.include('email')
          done()
        })
    });

    it ('should be unique', done => {
      const params = {
        email: 'test@example.com',
        password: 'test'
      };

      const user1 = new User(params);
      const user2 = new User(params);

      user1.save().then();
      user2.save()
        .catch(err => {
          //console.log(err.message)
          expect(err.message).to.include('duplicate')
          done()
        })
    })
  })

  context('password', () => {
    it ('is invalid without a password', done => {
      let user = new User();

      user.save()
        .catch(err => {
          const keys = Object.keys(err.errors);

          expect(keys).to.include('password');
          done()
        })
    })
  })

  describe('#save', () => {
    it ('hashes the password', done => {
      let user = new User({
        email: 'test@example.com',
        password: 'password',
      });

      user
        .save()
        .then(u => {
          expect(bcrypt.compareSync('password', u.password)).to.eq(true);
          done();
        })
    })
  })

});
