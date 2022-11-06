const createFeedbackRoutes = require('./feedback');
const createAuthRoutes = require('./auth');
const createCommentRoutes = require('./comment');
const createUserRoutes = require('./user');

const Feedback = require('../models/feedback');
const User = require('../models/user');
const Comment = require('../models/comment');
const jwtService = require('../services/jwt');
const sendEmail = require('../services/email');
const bcryptHash = require('../services/hash');
const resetPasswordToken = require('../utils/resetPasswordToken');
const AppError = require('../utils/appError');
const deleteImageFile = require('../utils/deleteImageFile');
const httpStatusCodes = require('../constants/httpStatusCodes');
const feedbackCategoryOptions = require('../constants/feedbackCategoryOptions');
const feedbackStatusOptions = require('../constants/feedbackStatusOptions');

function createRoutes(app) {
  const objRepo = {
    Feedback,
    User,
    Comment,
    signToken: jwtService.signToken,
    verifyToken: jwtService.verifyToken,
    hashToken: resetPasswordToken.hashToken,
    sendEmail,
    bcryptHash,
    AppError,
    deleteImageFile,
    httpStatusCodes,
    feedbackCategoryOptions,
    feedbackStatusOptions
  }

  app.use('/feedbacks', createFeedbackRoutes(objRepo));
  app.use('/auth', createAuthRoutes(objRepo));
  app.use('/comments', createCommentRoutes(objRepo));
  app.use('/users', createUserRoutes(objRepo));

  return app;
};

module.exports = createRoutes;