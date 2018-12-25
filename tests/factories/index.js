const {User, factory, Blacklist, jwt} = require('../utils/helper')

factory.define('user', User, {
  email: factory.sequence('User.email', n => `example${n}@test.com`),
  password: 'password'
});

factory.define('blacklist', Blacklist, {
  token: jwt.sign({ test: 'test' }, process.env.SECRET, { expiresIn: '1h' })
})
