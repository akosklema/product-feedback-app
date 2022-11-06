import customFetch from './customFetch';
import configData from '../config';

export function createNewComment(feedbackId, content) {
  return customFetch(`${configData.SERVER_URL}/feedbacks/${feedbackId}/comments`, 'POST', {
    'Content-Type': 'application/json'
  }, JSON.stringify({
    content
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