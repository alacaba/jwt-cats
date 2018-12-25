const {User, factory} = require('../utils/helper')

factory.define('user', User, {
  email: factory.sequence('User.email', n => `example${n}@test.com`),
  password: 'password'
});
