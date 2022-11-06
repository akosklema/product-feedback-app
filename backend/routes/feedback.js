const express = require('express');

const feedbackController = require('../controllers/feedback');
const commentController = require('../controllers/comment');
const isAuth = require('../middlewares/isAuth');
const feedbackInputValidation = require('../middlewares/validation/feedbackInput');
const commentInputValidation = require('../middlewares/validation/commentInput');
const validateIdParam = require('../middlewares/validation/idParam');

function createFeedbackRoutes(objRepo) {
  const router = express.Router();

  router
    .route('/')
    .get(
      isAuth(objRepo),
      feedbackController.getAllFeedbacks(objRepo)
    )
    .post(
      isAuth(objRepo),
      feedbackInputValidation.validateCreateInput(objRepo),
      feedbackController.createFeedback(objRepo)
    );
  
  router
    .route('/:feedbackId')
    .get(
      isAuth(objRepo),
      validateIdParam(objRepo, 'Feedback'),
      feedbackController.getFeedback(objRepo)
    )
    .put(
      isAuth(objRepo),
      validateIdParam(objRepo, 'Feedback'),
      feedbackInputValidation.validateUpdateFeedbackInput(objRepo),
      feedbackController.updateFeedback(objRepo))
    .delete(
      isAuth(objRepo),
      validateIdParam(objRepo, 'Feedback'),
      feedbackController.deleteFeedback(objRepo)
    );
  
  router.patch('/:feedbackId/upvote',
    isAuth(objRepo),
    validateIdParam(objRepo, 'Feedback'),
    feedbackController.handleFeedbackUpvote(objRepo)
  );

  router.post('/:feedbackId/comments',
    isAuth(objRepo),
    validateIdParam(objRepo, 'Feedback'),
    commentInputValidation.validateCreateCommentInput(objRepo),
    commentController.createComment(objRepo)
  );

  return router;
};


module.exports = createFeedbackRoutes;