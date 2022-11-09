import customFetch from './customFetch';
import configData from '../config';

export function signupUser(fullname, username, email, password) {
  return fetch(`${configData.SERVER_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fullname,
      username,
      email,
      password
    })
  })
    .then((res) => res.json())
    .then((resData) => {
      if (resData.status !== 'success') {
        throw new Error(resData.message);
      }
      return resData;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export function loginUser(email, password) {
  return fetch(`${configData.SERVER_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then((res) => {
      if (res.status === 404) {
        throw new Error('Incorrect email or password');
      } else {
        res.json();
      }
    })
    .then((resData) => {
      if (resData.status !== 'success') {
        throw new Error(resData.message);
      }
      
      return resData.data;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export function logoutUser() {
  return customFetch(`${configData.SERVER_URL}/auth/logout`, 'POST')
    .then((res) => res.json())
    .then((resData) => {
      if (resData.status !== 'success') {
        throw new Error(resData.message);
      }
      
      return resData.message;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export function forgotPassword(email) {
  return fetch(`${configData.SERVER_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email
    })
  })
    .then((res) => res.json())
    .then((resData) => {
      if (resData.status !== 'success') {
        throw new Error(resData.message);
      }
      
      return resData.message;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export function resetPassword(resetPwToken, newPassword) {
  return fetch(`${configData.SERVER_URL}/auth/reset-password/${resetPwToken}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: newPassword
    })
  })
    .then((res) => res.json())
    .then((resData) => {
      if (resData.status !== 'success') {
        throw new Error(resData.message);
      }
      
      return resData.message;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};