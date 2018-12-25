const User = require('../user');

class AuthController {
  static login (req, res) {
    const { email, password } = req.body;

    User
      .findOne({ email })
      .then(user => {
        if (user && user.verifyPassword(password)) {
          console.log('test')
          const token = user.generateToken();
          console.log('test2')
          res.json({ token })
        } else {
          return Promise.reject('Invalid email or password')
        }
      })
      .catch(err => {
        res.status(400).json({ msg: err });
      })
  }

  static logout (req, res) {
  }
}

module.exports = AuthController;

