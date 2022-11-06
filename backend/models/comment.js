const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxLength: [250, 'The comment must have maximum 250 characters.']
  },
  replies: {
    type: [{
      id: String,
      author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      content: {
        type: String,
        required: true,
        maxLength: [250, 'The reply must have maximum 250 characters.']
      },
      replyTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    }],
    default: []
  }
});

module.exports = mongoose.model('Comment', commentSchema);