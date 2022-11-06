const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: {
      values: ['feature', 'ui', 'ux', 'enhancement', 'bug'],
      message: 'The category can only be: Feature, UI, UX, Enhancement or Bug.'
    }
  },
  status: {
    type: String,
    enum: {
      values: ['suggestion', 'planned', 'in-progress', 'live'],
      message: 'The status can only be: Suggestion, Planned, In-Progress or Live.'
    },
    default: 'suggestion'
  },
  upvotes: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: 'User'
  },
  comments: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    default: []
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);