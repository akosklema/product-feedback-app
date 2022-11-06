exports.validateSignupInput = function(objRepo) {
  const { AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const fullname = req.body.fullname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!fullname || !username || !email || !password) {
      return next(new AppError('All fields are required.', httpStatusCodes.BAD_REQUEST));
    }

    if (password.length < 6) {
      return next(new AppError('Password should be at least 6 characters.', httpStatusCodes.BAD_REQUEST));
    }

    req.inputData = {
      fullname,
      username,
      email,
      password
    };

    return next();
  };
};

exports.validateLoginInput = function(objRepo) {
  const { AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return next(new AppError('All fields are required.', httpStatusCodes.BAD_REQUEST));
    }

    req.inputData = {
      email,
      password
    };

    return next();
  };
};

exports.validateLoginInput = function(objRepo) {
  const { AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return next(new AppError('All fields are required.', httpStatusCodes.BAD_REQUEST));
    }

    req.inputData = {
      email,
      password
    };

    return next();
  };
};

exports.validateForgotPwInput = function(objRepo) {
  const { AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const email = req.body.email;

    if (!email) {
      return next(new AppError('Email is required.', httpStatusCodes.BAD_REQUEST));
    }

    req.inputData = {
      email
    };

    return next();
  };
};

exports.validateResetPwInput = function(objRepo) {
  const { AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const resetToken = req.params.resetToken;
    const newPassword = req.body.password;

    const re = /[0-9a-f]{40}/;

    const tokenIsValid = re.test(resetToken.toLowerCase());

    if (!tokenIsValid) {
      return next(new AppError('Reset password token is invalid.', httpStatusCodes.BAD_REQUEST));
    }

    if (!newPassword) {
      return next(new AppError('Password is required.', httpStatusCodes.BAD_REQUEST));
    }

    req.inputData = {
      resetToken,
      newPassword
    };

    return next();
  };
};

exports.validateRefreshTokenInput = function(objRepo) {
  const { verifyToken, AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      return next(new AppError('Refresh token is required.', httpStatusCodes.BAD_REQUEST));
    }

    let decodedToken;

    try {
      decodedToken = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      return next(new AppError(error.message, httpStatusCodes.UNAUTHORIZED));
    }

    if (!decodedToken) {
      return next(new AppError('Refresh token is invalid.', httpStatusCodes.NOT_FOUND));
    }

    req.inputData = {
      userId: decodedToken.userId,
      refreshToken
    };

    return next();
  };
};