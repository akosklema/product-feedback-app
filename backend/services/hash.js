const bcrypt = require('bcryptjs');

exports.hash = function(plainText) {
  return bcrypt.hash(plainText, 12);
};

exports.compare = function(plainText, hashedText) {
  return bcrypt.compare(plainText, hashedText);
};