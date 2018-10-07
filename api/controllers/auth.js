const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send({ message: 'No token provided.' });
  }

  const secret = process.env.JWT_SECRET;
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log({ err });
      return res.status(500).send({ message: 'Authentication failed.' });
    }

    console.log({ decoded });

    req.userId = decoded.id;
    next();
  });
};

