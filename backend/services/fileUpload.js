const path = require('path');

const multer = require('multer');

const AppError = require('../utils/appError');
const httpStatusCodes = require('../constants/httpStatusCodes');

const fileStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, './images');
  },
  filename: function(req, file, cb) {
    const randomNumber = Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname).toLowerCase();
    return cb(null, `${file.fieldname}-${Date.now()}-${randomNumber}${fileExtension}`);
  }
});

const fileFilter = function(req, file, cb) {
  if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
    return cb(null, true)
  } else {
    return cb(new AppError('Invalid image type.', httpStatusCodes.BAD_REQUEST), false);
  }
};

const uploadImageMiddleware = multer({ storage: fileStorage, fileFilter: fileFilter });

module.exports = uploadImageMiddleware;