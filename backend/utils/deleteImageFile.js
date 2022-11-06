const path = require('path');
const fs = require('fs');

function deleteImageFile(imagePath) {
  const filePath = path.join(__dirname, '..', imagePath);
  fs.unlink(filePath, error => {
    if (error) {
      console.log(error);
    }
  });
};

module.exports = deleteImageFile;