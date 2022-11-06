import {
  GET_ALL_FEEDBACK_REQUEST,
  GET_ALL_FEEDBACK_SUCCESS,
  GET_ALL_FEEDBACK_FAIL,
  UPDATE_FEEDBACK_LIST,
  UPVOTE_FEEDBACK_LIST,
  RESET_FEEDACK_LIST
} from '../actions/types';

const initialState = {
  loading: false,
  loaded: false,
  feedbacks: [],
  error: false,
}

function feedbackReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    
    case GET_ALL_FEEDBACK_SUCCESS:
      const feedbacks = payload.feedbackListData.feedbacks.map(feedback => {
        const upvotesCount = feedback.upvotes.length;
        let commentsCount = feedback.comments.length;
        feedback.comments.forEach(comment => {
          if (comment.replies) {
            commentsCount += comment.replies.length;
          }
        });

        return {
          ...feedback,
          commentsCount,
          upvotesCount
        };
      });

      return {
        ...state,
        loading: false,
        loaded: true,
        feedbacks,
        suggestionCount: payload.feedbackListData.suggestionCount,
        plannedCount: payload.feedbackListData.plannedCount,
        inProgressCount: payload.feedbackListData.inProgressCount,
        liveCount: payload.feedbackListData.liveCount,
        totalItems: payload.feedbackListData.totalItems
      };
    
    case GET_ALL_FEEDBACK_FAIL:
      return {
        ...state,
        loading: false,
        feedbacks: null,
        error: true
      };
    
    case UPDATE_FEEDBACK_LIST:
      const newFeedbackList = state.feedbacks.map(feedback => {
        if (feedback.id === payload.feedbackId) {
          return { ...feedback, ...payload.updateObj };
        }

        return { ...feedback };
      });

      return {
        ...state,
        feedbacks: newFeedbackList,
      };

    case UPVOTE_FEEDBACK_LIST:
      const updatedFeedbackList = state.feedbacks.map(feedback => {
        if (feedback._id === payload.feedbackId) {
          if (feedback.upvotes.includes(payload.userId)) {
            feedback.upvotes.splice(feedback.upvotes.findIndex((id) => id === payload.userId), 1);
          } else {
            feedback.upvotes.push(payload.userId);
          }
          return feedback;
        }
        return feedback;
      });

      return {
        ...state,
        feedbacks: updatedFeedbackList,
      };
    
    case RESET_FEEDACK_LIST:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: false,
        feedbacks: [],
      }
      
    default:
      return state;
  }
};

export default feedbackReducer;