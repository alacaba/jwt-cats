const User = require('./index');

class UserController {
  static index (req, res) {
    User
      .find({})
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res
          .status(404)
          .json({ msg: err.msg })
      })
  }

  static show(req, res) {
  }

  static update() {
  }

  static destroy() {
  }
}

module.exports = UserController;
