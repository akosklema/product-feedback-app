module.exports = function validateIdParam(objRepo, type){
  const { AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    let key;
    if (type === 'Feedback') {
      key = 'feedbackId'
    } else if (type === 'Comment') {
      key = 'commentId'
    }
    const id = req.params[key];

    const re = /[0-9a-f]{24}/;

    const idIsValid = re.test(id.toLowerCase());

    if (!idIsValid) {
      return next(new AppError(`${type} ID is invalid.`, httpStatusCodes.BAD_REQUEST));
    }

    const inputData = { ...req.inputData };
    inputData[key] = id.toLowerCase()
    req.inputData = inputData;

    return next();
  };
};