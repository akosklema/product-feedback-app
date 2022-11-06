const mongoose = require('mongoose');

const bcryptHash = require('../services/hash');
const resetPasswordToken = require('../utils/resetPasswordToken');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'Fullname is required.']
  },
  username: {
    type: String,
    required: [true, 'Username is required.']
  },
  email: {
    type: String,
    required: [true, 'Email address is required.']
  },
  password: {
    type: String,
    required: [true, 'Password is required.']
  },
  profileImageUrl: {
    type: String,
    default: ''
  },
  passwordResetToken: {
    token: String,
    expiresIn: Date
  },
  refreshToken: String

});

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  bcryptHash.hash(this.password, 12)
    .then((hashedPw) => {
      this.password = hashedPw;

      return next();
    })
    .catch((error) => {
      console.log(error);
    });
});

userSchema.pre('save', function(next) {
  if (!this.isModified('refreshToken')) {
    return next();
  }

  if (this.refreshToken === undefined) {
    return next();
  }

  bcryptHash.hash(this.refreshToken, 12)
    .then((hashedRefreshToken) => {
      this.refreshToken = hashedRefreshToken;

      return next();
    })
    .catch((error) => {
      console.log(error);
    });
});

userSchema.methods.isPwCorrect = function(inputPassword) {
  return bcryptHash.compare(inputPassword, this.password);
};

userSchema.methods.createPwResetToken = function() {
  const token = resetPasswordToken.createToken();
  const hashedToken = resetPasswordToken.hashToken(token);

  this.passwordResetToken = {
    token: hashedToken,
    expiresIn: Date.now() + (5 * 1000 * 60 * 60)
  };

  return token;
};

module.exports = mongoose.model('User', userSchema);