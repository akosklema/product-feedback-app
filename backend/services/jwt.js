const jwt = require('jsonwebtoken');

exports.signToken = function(id, username, secret, expiresIn) {
  return jwt.sign({ userId: id, username: username }, secret, { expiresIn: expiresIn });
};

exports.verifyToken = function(token, secret) {
  return jwt.verify(token, secret);
};