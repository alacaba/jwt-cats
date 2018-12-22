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
    const { id } = req.params;

    User
      .findOne({ _id: id })
      .then(user => {
        let ret;

        if (user) {
          ret = user;
        } else {
          res.status(404)
          ret = { msg: "Not found" }
        }

        res.json(ret)
      })
  }

  static update(req, res) {
    const { id } = req.params;

    User.findOneAndUpdate({ _id: id }, req.body, { new: true }, (err, response) => {
      if (!response)  {
        response = { msg: "Not found" }
        res.status(404)
      }

      res.json(response)
    })
  }

  static destroy(req, res) {
    const { id } = req.params;

    User.findByIdAndRemove(id, {}, (err, response) => {
      if (!response) {
        res.status(404)
        response = { msg: "Not found" }
      }

      res.json(response)
    })
  }
}

module.exports = UserController;
