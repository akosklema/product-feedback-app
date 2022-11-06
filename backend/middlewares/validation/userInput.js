exports.validateUpdateInput = function(objRepo) {
  const { AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const { fullname, username, password } = req.body;

    if (!fullname || !username) {
      return next(new AppError('Fullname and username are required.', httpStatusCodes.BAD_REQUEST));
    }

    const userInputData = {
      fullname,
      username
    };

    if (password !== '') {
      userInputData.password = password
    }

    req.inputData = { ...userInputData };

    return next();
  };
};