exports.signup = function(objRepo) {
  const { User, AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const { fullname, username, email, password } = req.inputData;

    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          return next(new AppError('The email address is already registered.', httpStatusCodes.BAD_REQUEST));
        }

        return User.create({
          fullname: fullname,
          username: username,
          email: email,
          password: password
        })
      })
      .then((user) => {
        return res.status(httpStatusCodes.CREATED).json({
          status: 'success',
          message: 'Successful registration.'
        })
      })
      .catch((error) => {
        return next(new AppError('Server error.', httpStatusCodes.INTERNAL_SERVER_ERROR));
      });
  };
};

exports.login = function(objRepo) {
  const { User, signToken, bcryptHash, AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const { email, password } = req.inputData;
    let userToLogin;

    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return next(new AppError('Incorrect email or password.', httpStatusCodes.NOT_FOUND));
        }

        userToLogin = user;
        return user.isPwCorrect(password);
      })
      .then((pwIsCorrect) => {
        if (!pwIsCorrect) {
          return next(new AppError('Incorrect email or password.', httpStatusCodes.NOT_FOUND));
        }

        const accessToken = signToken(userToLogin._id, userToLogin.username, process.env.JWT_SECRET, process.env.ACCESS_TOKEN_EXPIN);
        const refreshToken = signToken(userToLogin._id, userToLogin.username, process.env.JWT_REFRESH_SECRET, process.env.REFESH_TOKEN_EXPIN);

        userToLogin.refreshToken = refreshToken;
        return userToLogin.save()
          .then(() => {
            res.status(httpStatusCodes.OK).json({
              status: 'success',
              data: {
                userId: userToLogin._id,
                accessToken,
                refreshToken
              }
            });
          });
      })
      .catch((error) => {
        return next(new AppError('Server error.', httpStatusCodes.INTERNAL_SERVER_ERROR));
      });
  };
};

exports.forgotPassword = function(objRepo) {
  const { User, sendEmail, AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const { email } = req.inputData;
    let loadedUser;

    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return next(new AppError('User not found.', httpStatusCodes.NOT_FOUND));
        }
        loadedUser = user;
        return user.createPwResetToken();
      })
      .then((resetToken) => {
        loadedUser.save()
        .then(() => {
          return sendEmail(
            loadedUser.email,
            'Forgot password',
            `You can reset Your password on: ${process.env.CLIENT_URL}/reset-password/${resetToken}`
          )
          .then(() => {
            return res.status(httpStatusCodes.OK).json({
              status: 'success',
              resetToken: 'Email sent to the user.'
            })
          })
        })
      })
      .catch((error) => {
        return next(new AppError('Server error.', httpStatusCodes.INTERNAL_SERVER_ERROR));
      });
  };
};

exports.resetPassword = function(objRepo) {
  const { User, hashToken, AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const { resetToken, newPassword } = req.inputData;

    const hashedToken = hashToken(resetToken);

    User.findOne({
      'passwordResetToken.token': hashedToken,
      'passwordResetToken.expiresIn': { $gt: Date.now() }
    })
      .then((user) => {
        if (!user) {
          return next(new AppError('Reset token is invalid or has expired.', httpStatusCodes.NOT_FOUND));
        }

        user.password = newPassword;
        user.passwordResetToken = undefined;
        return user.save()
          .then(() => {
            return res.status(httpStatusCodes.OK).json({
              status: 'success',
              message: 'Password has changed. You can login with your new password.'
            })
          })
      })
      .catch((error) => {
        return next(new AppError('Server error.', httpStatusCodes.INTERNAL_SERVER_ERROR));
      });
  };
};

exports.sendNewAccessToken = function(objRepo) {
  const { User, bcryptHash, signToken, AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const userId = req.inputData.userId;
    const plainRefreshToken = req.inputData.refreshToken;

    let user;

    User.findById(userId)
      .then((foundUser) => {
        if (!foundUser) {
          return next(new AppError('Refresh token is invalid.', httpStatusCodes.NOT_FOUND));
        }

        user = foundUser;

        return bcryptHash.compare(plainRefreshToken, user.refreshToken)
      })
      .then((tokensAreSame) => {
        if (!tokensAreSame) {
          return next(new AppError('Refresh token is invalid.', httpStatusCodes.NOT_FOUND));
        }

        const accessToken = signToken(user._id, user.username, process.env.JWT_SECRET, process.env.ACCESS_TOKEN_EXPIN);

        return res.status(httpStatusCodes.OK).json({
          status: 'success',
          data: {
            accessToken
          }
        });
      })
      .catch((error) => {
        return next(new AppError('Server error.', httpStatusCodes.INTERNAL_SERVER_ERROR));
      });
  };
};

exports.logout = function(objRepo) {
  const { AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const loggedInUser = req.loggedInUser;

    loggedInUser.refreshToken = undefined;

    loggedInUser.save()
      .then(() => {
        return res.status(httpStatusCodes.OK).json({
          status: 'success',
          message: 'User has logged out.'
        });
      })
      .catch((error) => {
        return next(new AppError('Server error.', httpStatusCodes.INTERNAL_SERVER_ERROR));
      });
  };
};