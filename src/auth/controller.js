const User = require('../user');
const Blacklist = require('../blacklist');

class AuthController {
  static login (req, res) {
    const { email, password } = req.body;

    User
      .findOne({ email })
      .then(user => {
        if (user && user.verifyPassword(password)) {
          const token = user.generateToken();
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
    const b = new Blacklist({ token: req.token });

    b.save()
      .then(_ => {
        req.user = null;
        req.token = null;

        res.send({ success: true })
      })
  }
}

module.exports = AuthController;

