import {
  GET_ALL_FEEDBACK_REQUEST,
  GET_ALL_FEEDBACK_SUCCESS,
  GET_ALL_FEEDBACK_FAIL,
  RESET_FEEDACK_LIST
} from './types';

import { getFeedbackDocs } from '../../services/feedback';

function getAllFeedbackRequest() {
  return { type: GET_ALL_FEEDBACK_REQUEST };
};

function getAllFeedbackSuccess(feedbackListData) {
  return { type: GET_ALL_FEEDBACK_SUCCESS, payload: { feedbackListData } };
};

function getAllFeedbackFail() {
  return { type: GET_ALL_FEEDBACK_FAIL };
};

export function getAllFeedback(currentPage, feedbacksPerPage, category, status) {
  return (dispatch) => {
    dispatch(getAllFeedbackRequest());
    return getFeedbackDocs(currentPage, feedbacksPerPage, category, status).then(
      (feedbackListData) => {
        dispatch(getAllFeedbackSuccess(feedbackListData));
        
        return Promise.resolve();
      },
      (error) => {
        dispatch(getAllFeedbackFail());

        return Promise.reject(error);
      }
    );
  };
};

export function getRoadmapFeedbacks(statusList) {
  return (dispatch) => {
    dispatch(getAllFeedbackRequest());
    return getFeedbackDocs(null, null, null, statusList).then(
      (feedbackListData) => {
        dispatch(getAllFeedbackSuccess(feedbackListData));
        
        return Promise.resolve();
      },
      (error) => {
        dispatch(getAllFeedbackFail());

        return Promise.reject(error);
      }
    );
  };
};

export function resetFeedbackList() {
  return { type: RESET_FEEDACK_LIST };
};