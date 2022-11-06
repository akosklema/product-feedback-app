const express = require('express');

const userController = require('../controllers/user');
const isAuth = require('../middlewares/isAuth');
const userInputValidation = require('../middlewares/validation/userInput');
const uploadImageMiddleware = require('../services/fileUpload');

function createUserRoutes(objRepo) {
  const router = express.Router();

  router
    .route('/authed')
    .get(
      isAuth(objRepo),
      userController.getLoggedInUser(objRepo)
    )
    .put(
      isAuth(objRepo),
      userInputValidation.validateUpdateInput(objRepo),
      userController.updateLoggedInUser(objRepo)
    );
  
  router.post('/authed/image',
    isAuth(objRepo),
    uploadImageMiddleware.single('userImage'),
    userController.updateLoggedInUserImage(objRepo)
  );

  return router;
};

module.exports = createUserRoutes;