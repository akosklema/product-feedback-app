import {
  CREATE_FEEDBACK_REQUEST,
  CREATE_FEEDBACK_SUCCESS,
  CREATE_FEEDBACK_FAIL,
  UPDATE_FEEDBACK_REQUEST,
  UPDATE_FEEDBACK_SUCCESS,
  UPDATE_FEEDBACK_FAIL,
  GET_FEEDBACK_REQUEST,
  GET_FEEDBACK_SUCCESS,
  GET_FEEDBACK_FAIL,
  UPVOTE_FEEDBACK_SUCCESS,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_REPLY_REQUEST,
  CREATE_REPLY_SUCCESS,
  CREATE_REPLY_FAIL,
  DELETE_FEEDBACK_REQUEST,
  DELETE_FEEDBACK_SUCCESS,
  DELETE_FEEDBACK_FAIL,
  RESET_FEEDBACK
} from '../actions/types';

const initialState = {
  isLoading: false,
  loaded: false,
  feedback: {},
  error: false,
}

function oneFeedbackReducer(state = initialState, { type, payload }) {
  let updatedFeedback;
  switch (type) {
    case CREATE_FEEDBACK_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    
    case CREATE_FEEDBACK_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    
    case CREATE_FEEDBACK_FAIL:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    
      case GET_FEEDBACK_REQUEST:
        return {
          ...state,
          isLoading: true
        };
      
    case GET_FEEDBACK_SUCCESS:
      let commentsCount = payload.feedback.comments.length;
      payload.feedback.comments.forEach(comment => {
        if (comment.replies) {
          commentsCount += comment.replies.length;
        }
      });
      
      return {
        ...state,
        isLoading: false,
        loaded: true,
        feedback: {
          ...payload.feedback,
          commentsCount
        }
      };
    
    case GET_FEEDBACK_FAIL:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    
    case UPDATE_FEEDBACK_REQUEST:
      return {
        ...state
      };
    
    case UPDATE_FEEDBACK_SUCCESS:
      return {
        ...state,
      };
    
    case UPDATE_FEEDBACK_FAIL:
      return {
        ...state,
        error: true
      };

    case UPVOTE_FEEDBACK_SUCCESS:
      const loggedInUserId = payload.userId;
      let upvotes;
      if (payload.feedback.upvotes.includes(loggedInUserId)) {
        upvotes = payload.feedback.upvotes.filter((id) => id !== loggedInUserId);
      } else {
        upvotes = [...payload.feedback.upvotes, loggedInUserId]
      }

      const newFeedback = { ...payload.feedback, upvotes };

      return {
        ...state,
        feedback: newFeedback
      }
    
    case CREATE_COMMENT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    
    case CREATE_COMMENT_SUCCESS:
      const updatedCommentList = [...state.feedback.comments, payload.comment];
      
      const updatedCommentCount = state.feedback.commentsCount + 1;

      return {
        ...state,
        isLoading: false,
        feedback: {
          ...state.feedback,
          comments: updatedCommentList,
          commentsCount: updatedCommentCount
        }
      };
    
    case CREATE_COMMENT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    
    case CREATE_REPLY_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    
    case CREATE_REPLY_SUCCESS:
      const updatedCommentsList = state.feedback.comments.map((comment) => {
        if (comment._id === payload.commentId) {
          comment.replies = payload.replies;
          return comment;
        } else {
          return comment;
        }
      });
      
      updatedFeedback = {
        ...state.feedback,
        commentsCount: state.feedback.commentsCount + 1,
        comments: updatedCommentsList
      };

      return {
        ...state,
        isLoading: false,
        feedback: {
          ...updatedFeedback
        }
      };
    
    case CREATE_REPLY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    
    case DELETE_FEEDBACK_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    
    case DELETE_FEEDBACK_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    
    case DELETE_FEEDBACK_FAIL:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    
    case RESET_FEEDBACK:
      return {
        ...state,
        isLoading: false,
        loaded: false,
        error: false,
        feedback: {}
      }
    
    default:
      return state;
  }
};

export default oneFeedbackReducer;