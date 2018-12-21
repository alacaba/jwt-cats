const mongoose    = require('mongoose');
const Schema      = mongoose.Schema;
const bcrypt      = require('bcrypt');
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
},
{
  timestamps: true,
});

UserSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified) next();

  const salt = bcrypt.genSaltSync(SALT_FACTOR);
  const hash = bcrypt.hashSync(user.password, salt);

  user.set('password', hash);

  next();
});

UserSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
