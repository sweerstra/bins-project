const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.addUser = async (req, res) => {
  const user = new User(req.body);

  const { username } = await user.save();

  res.json({ username });
};

exports.getUsers = async (req, res, next) => {
  const users = await User.find({});

  res.json(users);
};

exports.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return next();
  }

  const verified = await user.comparePassword(password);

  if (!verified) {
    return next();
  }

  res.json({ username });
};
