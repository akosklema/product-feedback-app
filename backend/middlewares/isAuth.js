module.exports = function(objRepo) {
  const { verifyToken, User, AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const authHeader = req.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return next(new AppError('Not authenticated.', httpStatusCodes.UNAUTHORIZED));
    }

    const accessToken = authHeader.split(' ')[1];
    let decodedToken;

    try {
      decodedToken = verifyToken(accessToken, process.env.JWT_SECRET);
    } catch (error) {
      if (error.message === 'jwt expired') {
        return next(new AppError('JWT expired.', httpStatusCodes.FORBIDDEN));
      }

      return next(new AppError('Access token is invalid.', httpStatusCodes.UNAUTHORIZED));
    }

    if (!decodedToken) {
      return next(new AppError('Not authenticated.', httpStatusCodes.UNAUTHORIZED));
    }

    User.findById(decodedToken.userId)
      .then((user) => {
        if (!user) {
          return next(new AppError('User not found.', httpStatusCodes.NOT_FOUND));
        }

        req.loggedInUser = user;
        return next();
      })
      .catch((error) => {
        return next(new AppError(error.message, httpStatusCodes.INTERNAL_SERVER_ERROR));
      });
  };
};