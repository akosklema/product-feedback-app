exports.createComment = function (objRepo) {
  const { Comment, Feedback, AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const { feedbackId, content } = req.inputData;
    const authorId = req.loggedInUser._id;

    const comment = new Comment({
      author: authorId,
      content: content
    });

    let newComment;

    comment.save()
      .then((savedComment) => {
        newComment = savedComment;

        return Feedback.findById(feedbackId);
      })
      .then((feedback) => {
        if (!feedback) {
          return Comment.findByIdAndRemove(newComment._id)
            .then(() => {
              return next(new AppError('Feedback not found.', httpStatusCodes.NOT_FOUND));
            })
        }

        feedback.comments = [ ...feedback.comments, newComment._id ];
        feedback.save()
          .then(() => {
            return res.status(httpStatusCodes.CREATED).json({
              status: 'success',
              data: newComment
            });
          })
      })
      .catch((error) => {
        return next(new AppError('Server error.', httpStatusCodes.INTERNAL_SERVER_ERROR));
      });
  };
};

exports.createReply = function(objRepo) {
  const { Comment, AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const { commentId } = req.inputData;
    const { content, replyToId } = req.inputData.replyData;

    const reply = {
      author: req.loggedInUser._id,
      content: content,
      replyTo: replyToId
    };

    Comment.findById(commentId)
      .then((comment) => {
        if (!comment) {
          return next(new AppError('Comment not found.', httpStatusCodes.NOT_FOUND));
        }

        comment.replies = [ ...comment.replies, reply ];
        return comment.save()
          .then((comment) => {
            Comment.findById(commentId)
              .populate({
                path: 'replies',
                populate: { path: 'author', select: 'fullname username profileImageUrl' }
              })
              .populate({
                path: 'replies',
                populate: { path: 'replyTo', select: 'fullname username profileImageUrl' }
              })
              .then((comment) => {
                return res.status(httpStatusCodes.CREATED).json({
                  status: 'success',
                  data: comment.replies
                });
              });
          })
      })
      .catch((error) => {
        return next(new AppError('Server error.', httpStatusCodes.INTERNAL_SERVER_ERROR));
      })
  };
};