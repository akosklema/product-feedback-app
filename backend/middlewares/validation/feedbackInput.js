exports.validateCreateInput = function(objRepo){
  const { AppError, httpStatusCodes, feedbackCategoryOptions } = objRepo;
  return (req, res, next) => {
    const { title, detail, category } = req.body;

    if (!title || !detail || !category) {
      return next(new AppError('All fields are required.', httpStatusCodes.BAD_REQUEST));
    }

    if (!feedbackCategoryOptions.includes(category.toLowerCase())) {
      return next(
        new AppError('Invalid category. The category can only be: Feature, UI, UX, Enhancement or Bug.',
        httpStatusCodes.BAD_REQUEST)
      );
    }

    req.inputData = {
      title,
      detail,
      category: category.toLowerCase()
    }

    return next();
  };
};

exports.validateUpdateFeedbackInput = function(objRepo){
  const { AppError, httpStatusCodes, feedbackCategoryOptions, feedbackStatusOptions } = objRepo;
  return (req, res, next) => {
    const { title, category, status, detail } = req.body;

    if (!title || !category || !status, !detail) {
      return next(new AppError('All fields are required.', httpStatusCodes.BAD_REQUEST));
    }

    if (!feedbackCategoryOptions.includes(category.toLowerCase())) {
      return next(
        new AppError('Invalid category. The category can only be: Feature, UI, UX, Enhancement or Bug.',
        httpStatusCodes.BAD_REQUEST)
      );
    }

    if (!feedbackStatusOptions.includes(status.toLowerCase())) {
      return next(
        new AppError('Invalid status. The status can only be: Suggestion, Planned, In-Progress or Live',
        httpStatusCodes.BAD_REQUEST)
      );
    }

    req.inputData.feedbackData = {
      title,
      category: category.toLowerCase(),
      status: status.toLowerCase(),
      detail
    };

    return next();
  };
};