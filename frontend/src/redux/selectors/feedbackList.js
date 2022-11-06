export const getFeedbackListSlice = state => state.feedbackList;

const getSortByField = state => state.sort.sortBy;
const getSortIsAscending = state => state.sort.ascending;

const getSuggestions = state => state.feedbackList.feedbacks.filter(feedback => feedback.status === 'suggestion');

export function getFilteredSuggestions(state) {

  const sortBy = getSortByField(state);
  const isAscending = getSortIsAscending(state);
  let suggestions;

  if (isAscending) {
    suggestions = getSuggestions(state).sort((firstEl, secondEl) => {
      if (firstEl[sortBy] > secondEl[sortBy]) {
        return 1;
      } else {
        return -1;
      }
    });
  } else if (!isAscending) {
    suggestions = getSuggestions(state).sort((firstEl, secondEl) => {
      if (firstEl[sortBy] > secondEl[sortBy]) {
        return -1;
      } else {
        return 1;
      }
    });
  }
  return suggestions;
};

export function getPlannedFeedbacks(state) {
  return state.feedbackList.feedbacks.filter(feedback => feedback.status === 'planned');
};

export function getInProgressFeedbacks(state) {
  return state.feedbackList.feedbacks.filter(feedback => feedback.status === 'in-progress');
};

export function getLiveFeedbacks(state) {
  return state.feedbackList.feedbacks.filter(feedback => feedback.status === 'live')
};