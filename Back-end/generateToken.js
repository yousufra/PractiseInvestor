const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = (userName) => jwt.sign(
  {
    userName,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: '1h',
  },
);
