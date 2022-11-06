exports.validateCreateCommentInput = function(objRepo) {
  const { AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const content = req.body.content;

    if (!content) {
      return next(new AppError('Content is required.', httpStatusCodes.BAD_REQUEST));
    }

    if (content.lenght > 250) {
      return next(new AppError('Content can be maximum 250 characters.', httpStatusCodes.BAD_REQUEST));
    }

    req.inputData.content = content;

    return next();
  };
};

exports.validateCreateReplyInput = function(objRepo) {
  const { AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const { content, replyToId } = req.body;

    if ( !content || !replyToId) {
      return next(new AppError('All field is required.', httpStatusCodes.BAD_REQUEST));
    }

    if (content.lenght > 250) {
      return next(new AppError('Content can be maximum 250 characters.', httpStatusCodes.BAD_REQUEST));
    }

    const re = /[0-9a-f]{24}/;
    const idIsValid = re.test(replyToId.toLowerCase());

    if (!idIsValid) {
      return next(new AppError(`ReplyTo User ID is invalid.`, httpStatusCodes.BAD_REQUEST));
    }

    req.inputData.replyData = {
      content,
      replyToId
    };

    return next();
  };
};