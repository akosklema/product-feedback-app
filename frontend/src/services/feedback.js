import customFetch from './customFetch';
import configData from '../config';

export function getFeedbackDocs(currentPage = null, feedbacksPerPage = null, category = null, status = null) {
  let url;
  let statusParameter;
  const categoryParameter = category !== null ? `category=${category}` : null;

  if (Array.isArray(status)) {
    statusParameter = status.map(s => `status=${s}`).join('&');
  } else {
    statusParameter = status !== null ? `status=${status}` : 'status=suggestion';
  }

  if (currentPage === null && category === null) {
    url = `${configData.SERVER_URL}/feedbacks?&${statusParameter}&perPage=${feedbacksPerPage}`
  } else {
    url = `${configData.SERVER_URL}/feedbacks?page=${currentPage}&perPage=${feedbacksPerPage}&${categoryParameter}&${statusParameter}`
  }
  let resHeaders;
  
  return customFetch(url)
    .then((res) => {
      resHeaders = {
        suggestionCount: res.headers.get('Suggestion-Count'),
        plannedCount: res.headers.get('Planned-Count'),
        inProgressCount: res.headers.get('In-Progress-Count'),
        liveCount: res.headers.get('Live-Count')
      };
      return res.json();
    })
    .then((resJson) => {
      if (resJson.status !== 'success') {
        throw new Error(resJson.message);
      }

      const resData = { ...resJson.data, ...resHeaders };
      return resData;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export function getFeedbackDocById(feedbackId) {
  return customFetch(`${configData.SERVER_URL}/feedbacks/${feedbackId}`)
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

export function createFeedbackDoc(title, detail, category) {
  return customFetch(`${configData.SERVER_URL}/feedbacks`, 'POST', {
    'Content-Type': 'application/json'
  }, JSON.stringify({
    title,
    detail,
    category
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

export function upvoteFeedbackDoc(feedbackId) {
  return customFetch(`${configData.SERVER_URL}/feedbacks/${feedbackId}/upvote`, 'PATCH')
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

export function updateFeedbackDoc(feedbackId, title, category, status, detail) {
  return customFetch(`${configData.SERVER_URL}/feedbacks/${feedbackId}`, 'PUT', {
    'Content-Type': 'application/json'
  }, JSON.stringify({
    title,
    category,
    status,
    detail,
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

export function deleteFeedbackDoc(feedbackId) {
  return customFetch(`${configData.SERVER_URL}/feedbacks/${feedbackId}`, 'DELETE')
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