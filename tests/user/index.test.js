const { User, mongoose, expect, bcrypt, factory } = require('../utils/helper');

require('../factories');

describe('User Model', () => {
  beforeEach(async () => await User.deleteMany())

  it('creates a new user', done => {
    let user = factory.create('user');

    user
      .then(() => {
        User.countDocuments({}, (err, count) => {
          expect(count).to.eq(1);
          done()
        })
      })
      .catch(done)
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
        .catch(done)
    })
  })


  describe('#verifyPassword', () => {
    it ('check if the password supplied is valid', done => {
      const user = new User({
        email: 'test@example.com',
        password: 'password',
      });

      user.save()
        .then(u => {
          expect(u.verifyPassword('test')).to.equal(false)
          done()
        })
        .catch(done)
    })
  })

});
