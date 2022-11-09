import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  RESET_PW_REQUEST,
  RESET_PW_SUCCESS,
  RESET_PW_FAIL,
  LOGOUT
} from './types';

import { signupUser, loginUser, logoutUser } from '../../services/auth';

function signupRequest() {
  return { type: SIGNUP_REQUEST }
}

function singupSuccess() {
  return { type: SIGNUP_SUCCESS };
};

function signupFail() {
  return { type: SIGNUP_FAIL };
};

export function signup(fullname, username, email, password) {
  return (dispatch) => {
    dispatch(signupRequest());
    return signupUser(fullname, username, email, password).then(
      (user) => {
        dispatch(singupSuccess());
        
        return Promise.resolve(user.user);
      },
      (error) => {
        dispatch(signupFail());

        return Promise.reject(error);
      }
    );
  };
};

function loginRequest() {
  return { type: LOGIN_REQUEST };
};

function loginSuccess(jwt) {
  return { type: LOGIN_SUCCESS, payload: { jwt: jwt } };
};

function loginFail() {
  return { type: LOGIN_FAIL };
};

export function login(email, password) {
  return (dispatch) => {
    dispatch(loginRequest());
    return loginUser(email, password).then(
      (user) => {
        localStorage.setItem('jwt', JSON.stringify(user.accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(user.refreshToken));

        dispatch(loginSuccess(user.token));

        return Promise.resolve();
      },
      (error) => {
        dispatch(loginFail());
        
        return Promise.reject(error);
      }
    );
  };
};

function resetPwRequest() {
  return { type: RESET_PW_REQUEST };
};

function resetPwSuccess() {
  return { type: RESET_PW_SUCCESS };
};

function resetPwFail() {
  return { type: RESET_PW_FAIL };
};

// export function resetPassword(email) {
//   return (dispatch) => {
//     dispatch(resetPwRequest());
//     return resetUserPassword(email).then(
//       () => {
//         dispatch(resetPwSuccess());
//         return Promise.resolve();
//       },
//       (error) => {
//         dispatch(resetPwFail());
//         return Promise.reject(error);
//       }
//     );
//   };
// };

function logoutRequest () {
  return { type: LOGOUT };
};

export function logout() {
  return (dispatch) => {
    return logoutUser().then(
      (user) => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('refreshToken');
        dispatch(logoutRequest());

        return Promise.resolve();
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };
};