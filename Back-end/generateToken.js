const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      userName: user.userName,
      password: user.password
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d'
    }
  );
};