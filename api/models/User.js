const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.Promise = global.Promise;
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // hash the password along with our new salt
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  // override the cleartext password with the hashed one
  user.password = await bcrypt.hash(user.password, salt);

  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
