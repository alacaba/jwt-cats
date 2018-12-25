const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const BlacklistSchema = new Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  }
},
{
  timestamps: true
})

BlacklistSchema.path('token').validate(function (value) {
  try {
    const verified = jwt.verify(value, process.env.SECRET);
    return (verified) ? true : false
  } catch (e) {
    return false
  }
}, 'Token `{VALUE}` not valid')

module.exports = mongoose.model('Blacklist', BlacklistSchema)
