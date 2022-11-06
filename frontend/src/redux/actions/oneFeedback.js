import {
  CREATE_FEEDBACK_REQUEST,
  CREATE_FEEDBACK_SUCCESS,
  CREATE_FEEDBACK_FAIL,
  UPDATE_FEEDBACK_REQUEST,
  UPDATE_FEEDBACK_SUCCESS,
  UPDATE_FEEDBACK_FAIL,
  UPVOTE_FEEDBACK_SUCCESS,
  UPVOTE_FEEDBACK_LIST,
  GET_FEEDBACK_REQUEST,
  GET_FEEDBACK_SUCCESS,
  GET_FEEDBACK_FAIL,
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
} from './types';

import {
  getFeedbackDocById,
  createFeedbackDoc,
  upvoteFeedbackDoc,
  updateFeedbackDoc,
  deleteFeedbackDoc,
} from '../../services/feedback';

import { createNewComment } from '../../services/comment';
import { createNewReply } from '../../services/reply';

function createFeedbackRequest() {
  return { type: CREATE_FEEDBACK_REQUEST };
};

function createFeedbackSuccess() {
  return { type: CREATE_FEEDBACK_SUCCESS };
};

function createFeedbackFail() {
  return { type: CREATE_FEEDBACK_FAIL };
};

export function createFeedback(title, detail, category) {
  return (dispatch) => {
    dispatch(createFeedbackRequest());
    return createFeedbackDoc(title, detail, category).then(
      () => {
        dispatch(createFeedbackSuccess());

        return Promise.resolve();
      },
      (error) => {
        dispatch(createFeedbackFail());

        return Promise.reject(error);
      }
    );
  };
};

function updateFeedbackRequest() {
  return { type: UPDATE_FEEDBACK_REQUEST };
};

function updateFeedbackSuccess() {
  return { type: UPDATE_FEEDBACK_SUCCESS };
};

function updateFeedbackFail() {
  return { type: UPDATE_FEEDBACK_FAIL };
};

export function updateFeedback(feedbackId, title, category, status, detail) {
  return (dispatch) => {
    dispatch(updateFeedbackRequest());
    return updateFeedbackDoc(feedbackId, title, category, status, detail).then(
      () => {
        dispatch(updateFeedbackSuccess())
        return Promise.resolve();
      },
      (error) => {
        dispatch(updateFeedbackFail());

        return Promise.reject(error);
      }
    );
  };
};

function upvoteFeedbackSuccess(feedback, userId) {
  return { type:  UPVOTE_FEEDBACK_SUCCESS, payload: { feedback, userId } };
};

function upvoteFeedbackList(feedbackId, userId) {
  return { type:  UPVOTE_FEEDBACK_LIST, payload: { feedbackId, userId } };
};

export function upvoteFeedback(feedback, userId) {
  return (dispatch) => {
    return upvoteFeedbackDoc(feedback._id).then(
      () => {
        dispatch(upvoteFeedbackSuccess(feedback, userId));
        dispatch(upvoteFeedbackList(feedback._id, userId));

        return Promise.resolve();
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };
};

function createCommentRequest() {
  return { type:  CREATE_COMMENT_REQUEST };
};

function createCommentSuccess(comment) {
  return { type: CREATE_COMMENT_SUCCESS, payload: { comment } };
};

function createCommentFail() {
  return { type: CREATE_COMMENT_FAIL };
};

export function createComment(feedback, comment, loggedInUser) {
  return (dispatch) => {
    dispatch(createCommentRequest());
    return createNewComment(feedback._id, comment).then(
      (newComment) => {
        newComment.author = loggedInUser;
        dispatch(createCommentSuccess(newComment));

        return Promise.resolve();
      },
      (error) => {
        dispatch(createCommentFail());
        return Promise.reject(error);
      }
    );
  };
};

function createReplyRequest() {
  return { type:  CREATE_REPLY_REQUEST };
};

function createReplySuccess(commentId, replies) {
  return { type: CREATE_REPLY_SUCCESS, payload: { commentId, replies } };
};

function createReplyFail() {
  return { type: CREATE_REPLY_FAIL };
};

export function createReply(commentId, content, replyTo) {
  return (dispatch) => {
    dispatch(createReplyRequest());
    return createNewReply(commentId, content, replyTo._id).then(
      (replies) => {
        dispatch(createReplySuccess(commentId, replies));

        return Promise.resolve();
      },
      (error) => {
        dispatch(createReplyFail());
        return Promise.reject(error);
      }
    );
  };
};

function getFeedbackRequest() {
  return { type: GET_FEEDBACK_REQUEST };
};

function getFeedbackSuccess(feedback) {
  return { type: GET_FEEDBACK_SUCCESS, payload: { feedback } };
};

function getFeedbackFail() {
  return { type: GET_FEEDBACK_FAIL };
};

export function getFeedback(feedbackId) {
  return (dispatch) => {
    dispatch(getFeedbackRequest());
    return getFeedbackDocById(feedbackId).then(
      (feedback) => {
        dispatch(getFeedbackSuccess(feedback));

        return Promise.resolve();
      },
      (error) => {
        dispatch(getFeedbackFail());

        return Promise.reject(error);
      }
    );
  };
};

function deleteFeedbackRequest() {
  return { type: DELETE_FEEDBACK_REQUEST };
};

function deleteFeedbackSuccess() {
  return { type: DELETE_FEEDBACK_SUCCESS };
};

function deleteFeedbackFail() {
  return { type: DELETE_FEEDBACK_FAIL };
};

export function deleteFeedback(id) {
  return (dispatch) => {
    dispatch(deleteFeedbackRequest());
    return deleteFeedbackDoc(id).then(
      () => {
        dispatch(deleteFeedbackSuccess());
        return Promise.resolve();
      },
      (error) => {
        dispatch(deleteFeedbackFail());
        return Promise.reject();
      }
    );
  };
};

export function resetFeedback() {
  return { type: RESET_FEEDBACK };
};