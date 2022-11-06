exports.createFeedback = function(objRepo) {
  const { Feedback, AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const { title, detail, category } = req.inputData;

    const feedback = new Feedback({
      title: title,
      detail: detail,
      category: category
    });

    feedback.save()
      .then((feedback) => {
        return res.status(httpStatusCodes.CREATED).json({
          status: 'success',
          data: feedback
        })
      })
      .catch((error) => {
        return next(new AppError('Server error.', httpStatusCodes.INTERNAL_SERVER_ERROR));
      });
  };
};

exports.getAllFeedbacks = function(objRepo) {
  const { Feedback, AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const currentPage = req.query.page || 1;
    const feedbacksPerPage = req.query.perPage === 'null' ? 0 : req.query.perPage;
    const status = req.query.status;
    const category = req.query.category;
    let queryDetails = {};

    if (status) {
      if (Array.isArray(status)) {
        const statusList = status.map((s) => s.toLowerCase());
        queryDetails = { status: { '$in': statusList } }
      } else {
        queryDetails = { status: status.toLowerCase() };
      }
    }

    if (category) {
      queryDetails = { ...queryDetails, category: category.toLowerCase() };
    }
    
    let totalItems;
    let feedbacks;
    let suggestionCount;
    let plannedCount;
    let inProgressCount;
    let liveCount;

    Feedback.countDocuments(queryDetails)
      .then((count) => {
        totalItems = count;

        return Feedback.find(queryDetails)
          .skip((currentPage - 1) * feedbacksPerPage)
          .limit(feedbacksPerPage)
          .populate('comments');
      })
      .then((feedbackList) => {
        feedbacks = feedbackList;

        return Feedback.countDocuments({ status: 'suggestion' });
      })
      .then((sumSuggestions) => {
        suggestionCount = sumSuggestions;

        return Feedback.countDocuments({ status: 'planned' });
      })
      .then((sumPlanned) => {
        plannedCount = sumPlanned;

        return Feedback.countDocuments({ status: 'in-progress' });
      })
      .then((sumInProgress) => {
        inProgressCount = sumInProgress;

        return Feedback.countDocuments({ status: 'live' });
      })
      .then((sumLive) => {
        liveCount = sumLive;

        return res
          .status(httpStatusCodes.OK)
          .set({
            'Access-Control-Expose-Headers': 'Suggestion-Count, Planned-Count, In-Progress-Count, Live-Count',
            'Suggestion-Count': suggestionCount,
            'Planned-Count': plannedCount,
            'In-Progress-Count': inProgressCount,
            'Live-Count': liveCount
          })
          .json({
            status: 'success',
            data: {
              feedbacks: feedbacks,
              totalItems: totalItems
            }
        });
      })
      .catch((error) =>{
        return next(new AppError('Server error.', httpStatusCodes.INTERNAL_SERVER_ERROR));
      });
  };
};

exports.getFeedback = function(objRepo) {
  const { Feedback, AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const { feedbackId } = req.inputData;

    Feedback.findById(feedbackId)
      .populate('comments')
      .populate({
        path: 'comments',
        populate: { path: 'author', select: 'fullname username profileImageUrl' }
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'replies',
          populate: { path: 'author', select: 'fullname username profileImageUrl' },
        },
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'replies',
          populate: { path: 'replyTo', select: 'username' },
        },
      })
      .then((feedback) => {
        if (!feedback) {
          return next(new AppError('Feedback not found.', httpStatusCodes.NOT_FOUND));
        }

        return res.status(httpStatusCodes.OK).json({
          status: 'success',
          data: feedback
        });
      })
      .catch((error) => {
        return next(new AppError('Server error.', httpStatusCodes.INTERNAL_SERVER_ERROR));
      });
  };
};

exports.updateFeedback = function(objRepo) {
  const { Feedback, AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const { feedbackId, feedbackData } = req.inputData;


    Feedback.findByIdAndUpdate(feedbackId, feedbackData, { new: true, runValidators: true })
      .then((feedback) => {
        if (!feedback) {
          return next(new AppError('Feedback not found.', httpStatusCodes.NOT_FOUND));
        }
        return res.status(httpStatusCodes.OK).json({
          status: 'success',
          data: feedback
        });
      })
      .catch((error) => {
        return next(new AppError('Server error.', httpStatusCodes.INTERNAL_SERVER_ERROR));
      })
  };
};

exports.deleteFeedback = function(objRepo) {
  const { Feedback, Comment, AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const { feedbackId } = req.inputData;

    Feedback.findByIdAndRemove(feedbackId)
      .then((feedback) => {
        if (!feedback) {
          return next(new AppError('Feedback not found.', httpStatusCodes.NOT_FOUND));
        }

        return Comment.deleteMany({ _id: { $in: feedback.comments } });
      })
      .then(() => {
        return res.status(httpStatusCodes.OK).json({
          status: 'success',
          message: 'Feedback has deleted.'
        });
      })
      .catch((error) => {
        return next(new AppError('Server error.', httpStatusCodes.INTERNAL_SERVER_ERROR));
      });
  };
};

exports.handleFeedbackUpvote = function(objRepo) {
  const { Feedback, AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const loggedInUserId = req.loggedInUser._id;
    const feedbackId = req.inputData.feedbackId;
    
    Feedback.findById(feedbackId)
      .then((feedback) => {
        if (!feedback) {
          return next(new AppError('Feedback not found.', httpStatusCodes.NOT_FOUND));
        }

        let upvotes = [];

        if (feedback.upvotes.includes(loggedInUserId)) {
          upvotes = feedback.upvotes.filter((userId) => {
            return userId.toString() !== loggedInUserId.toString();
          });
        } else {
          upvotes = [...feedback.upvotes, loggedInUserId];
        }

        feedback.upvotes = upvotes;
        return feedback.save();
      })
      .then(() => {
        return res.status(httpStatusCodes.OK).json({
          status: 'success',
          message: 'Feedback upvoted / downvoted.'
        });
      })
      .catch((error) => {
        return next(new AppError('Server error.', httpStatusCodes.INTERNAL_SERVER_ERROR));
      });
  };
};