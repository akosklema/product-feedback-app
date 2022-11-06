import {
  GET_LOGGED_IN_USER_REQUEST,
  GET_LOGGED_IN_USER_SUCCESS,
  GET_LOGGED_IN_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_IMAGE
} from  './types';

import { fetchLoggedInUser, updateLoggedInUserDoc, updateLoggedInUserImg } from '../../services/user';

function getLoggedInUserRequest() {
  return { type: GET_LOGGED_IN_USER_REQUEST };
};

function getLoggedInUserSuccess(user) {
  return { type: GET_LOGGED_IN_USER_SUCCESS, payload: { user: user } };
};

function getLoggedInUserFail() {
  return { type: GET_LOGGED_IN_USER_FAIL };
};

export function getLoggedInUser() {
  return (dispatch) => {
    dispatch(getLoggedInUserRequest());
    return fetchLoggedInUser().then(
      (user) => {
        dispatch(getLoggedInUserSuccess(user));

        return Promise.resolve();
      },
      (error) => {
        dispatch(getLoggedInUserFail());
        
        return Promise.reject(error.message);
      }
    );
  };
};


function updateLoggedInUserRequest() {
  return { type: UPDATE_USER_REQUEST };
};

function updateLoggedInUserSuccess(fullname, username) {
  return { type: UPDATE_USER_SUCCESS, payload: { fullname, username } };
};

function updateLoggedInUserFail() {
  return { type: UPDATE_USER_FAIL };
};

export function updateLoggedInUser(fullname, username, password) {
  return (dispatch) => {
    dispatch(updateLoggedInUserRequest());
    return updateLoggedInUserDoc(fullname, username, password).then(
      () => {
        dispatch(updateLoggedInUserSuccess(fullname, username));

        return Promise.resolve();
      },
      (error) => {
        dispatch(updateLoggedInUserFail());
        return Promise.reject(error);
      }
    );
  };
};

function updateLoggedInUserImageAction(profileImageUrl) {
  return { type: UPDATE_USER_IMAGE, payload: { profileImageUrl } };
};

export function updateLoggedInUserImage(imageFile) {
  return (dispatch) => {
    return updateLoggedInUserImg(imageFile).then(
      (data) => {
        dispatch(updateLoggedInUserImageAction(data.profileImageUrl));
        return Promise.resolve();
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };
};