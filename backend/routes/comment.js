const express = require('express');

const commentController = require('../controllers/comment');
const isAuth = require('../middlewares/isAuth');
const commentInputValidation = require('../middlewares/validation/commentInput');
const validateIdParam = require('../middlewares/validation/idParam');

function createCommentRoutes(objRepo) {
  const router = express.Router();

  router.post('/:commentId/replies',
    isAuth(objRepo),
    validateIdParam(objRepo, 'Comment'),
    commentInputValidation.validateCreateReplyInput(objRepo),
    commentController.createReply(objRepo)
  );

  return router;
};

module.exports = createCommentRoutes;