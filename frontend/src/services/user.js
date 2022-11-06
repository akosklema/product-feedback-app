import customFetch from './customFetch';
import configData from '../config';

export function fetchLoggedInUser() {  
  return customFetch(`${configData.SERVER_URL}/users/authed`)
    .then((res) => res.json())
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

export function updateLoggedInUserDoc(fullname, username, password) {
  return customFetch(`${configData.SERVER_URL}/users/authed`, 'PUT', {
    'Content-Type': 'application/json'
  }, JSON.stringify({
      fullname,
      username,
      password
  }))
    .then((res) => res.json())
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

export function updateLoggedInUserImg(imageFile) {
  const formData = new FormData();
  formData.append('userImage', imageFile.file);

  return customFetch(`${configData.SERVER_URL}/users/authed/image`, 'POST', {}, formData)
    .then((res) => res.json())
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