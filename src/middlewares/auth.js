const jwt       = require('jsonwebtoken');
const User      = require('../user');
const Blacklist = require('../blacklist');

class TokenError extends Error {};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.get('Authorization');

  const [_, token] = authHeader.split(' ');

  const handleError = () => {
    const error = new TokenError('Invalid token')
    res.status(400).json({ msg: error.message })
  }

  if (!token) handleError()

  Blacklist
    .findOne({ token })
    .then(t => {
      if (t) return Promise.reject(t.token)

      const data = jwt.verify(token, process.env.SECRET) || {}

      if (data.id !== undefined) return User.findOne({ _id: data.id })

      return Promise.reject(data)
    })
    .then(user => {
      req.user = user;
      req.token = token;

      next()
    })
    .catch(handleError)
}
