const express = require('express');

const authController = require('../controllers/auth');
const authInputValidation = require('../middlewares/validation/authInput');
const isAuth = require('../middlewares/isAuth');

function createAuthRoutes(objRepo) {
  const router = express.Router();

  router.post('/signup',
    authInputValidation.validateSignupInput(objRepo),
    authController.signup(objRepo)
  );

  router.post('/login',
    authInputValidation.validateLoginInput(objRepo),
    authController.login(objRepo)
  );

  router.post('/forgot-password',
    authInputValidation.validateForgotPwInput(objRepo),
    authController.forgotPassword(objRepo)
  );

  router.patch('/reset-password/:resetToken',
    authInputValidation.validateResetPwInput(objRepo),
    authController.resetPassword(objRepo)
  );

  router.post('/refresh-token',
    authInputValidation.validateRefreshTokenInput(objRepo),
    authController.sendNewAccessToken(objRepo)
  );

  router.post('/logout',
    isAuth(objRepo),
    authController.logout(objRepo)
  );

  return router;
};


module.exports = createAuthRoutes;