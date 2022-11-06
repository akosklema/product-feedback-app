const crypto = require('crypto');

exports.createToken = function() {
  return crypto.randomBytes(20).toString('hex');
};

exports.hashToken = function(token) {
  return crypto.pbkdf2Sync(token, 'salt', 1000, 64, 'sha512').toString('hex');
};