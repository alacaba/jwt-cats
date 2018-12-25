const { factory } = require('factory-girl');
const User = require('../../src/user');

factory.define('user', User, {
  email: factory.sequence('User.email', n => `example${n}@test.com`),
  password: 'password'
});
