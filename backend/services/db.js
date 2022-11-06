const mongoose = require('mongoose');

function initDb(db, cb) {
  mongoose
    .connect(db)
    .then(() => {
      return cb();
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = initDb;