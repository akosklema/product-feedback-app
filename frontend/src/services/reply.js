import customFetch from './customFetch';
import configData from '../config';

export function createNewReply(commentId, content, replyToId) {
  return customFetch(`${configData.SERVER_URL}/comments/${commentId}/replies`, 'POST', {
    'Content-Type': 'application/json'
  }, JSON.stringify({
    content,
    replyToId
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