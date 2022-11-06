exports.getLoggedInUser = function(objRepo) {
  const { httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const { _id, fullname, username, profileImageUrl } = req.loggedInUser;

    res.status(httpStatusCodes.OK).json({
      status: 'success',
      data: {
        _id,
        fullname,
        username,
        profileImageUrl
      }
    });
  };
};

exports.updateLoggedInUser = function(objRepo) {
  const { User, AppError, httpStatusCodes } = objRepo;
  return (req, res, next) => {
    const loggedInUserId = req.loggedInUser._id;
    const { fullname, username, password } = req.inputData;

    User.findByIdAndUpdate(loggedInUserId, { fullname, username }, { new: true, runValidators: true })
      .then((user) => {
        if (!user) {
          return next(new AppError('User not found.', httpStatusCodes.NOT_FOUND));
        }

        if (password) {
          user.password = password;
        }
        
        return user.save()
          .then(() => {
            return res.status(httpStatusCodes.OK).json({
              status: 'success',
              message: 'User updated.'
            });
          })
      })
      .catch((error) => {
        return next(new AppError('Server error.', httpStatusCodes.INTERNAL_SERVER_ERROR));
      });
  };
};

exports.updateLoggedInUserImage = function(objRepo) {
  const { User, AppError, httpStatusCodes, deleteImageFile } = objRepo;
  return (req, res, next) => {
    const loggedInUserId = req.loggedInUser._id;
    
    const imagePath = req.file.path;
    
    User.findById(loggedInUserId)
      .then((user) => {
        if (!user) {
          return next(new AppError('User not found.', httpStatusCodes.NOT_FOUND));
        }

        if (user.profileImageUrl !== '') {
          deleteImageFile(user.profileImageUrl);
        }

        user.profileImageUrl = imagePath;
        return user.save()
          .then((user) => {
            return res.status(httpStatusCodes.OK).json({
              status: 'success',
              data: {
                profileImageUrl: user.profileImageUrl
              }
            });
          })
      })
      .catch((error) => {
        return next(new AppError('Server error.', httpStatusCodes.INTERNAL_SERVER_ERROR));
      });
  };
};