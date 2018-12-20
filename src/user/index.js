const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const SALT_FACTOR = Number(process.env.SALT_WORK_FACTOR);

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

UserSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified) next();

  const salt = bcrypt.genSaltSync(SALT_FACTOR);
  const hash = bcrypt.hashSync(user.password, salt);

  console.log(hash);

  user.password = hash;
  next();
})

module.exports = mongoose.model('User', UserSchema);
