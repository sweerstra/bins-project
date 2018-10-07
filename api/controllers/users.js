const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

exports.addUser = async (req, res) => {
  const user = new User(req.body);

  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ id: user.id }, secret, { expiresIn: '12h' });

  await user.save();

  res.json({ token });
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.userId, { password: 0 });

  if (!user) {
    next();
  }

  res.json(user);
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

  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ id: user.id }, secret, { expiresIn: '12h' });

  res.json({ token });
};
