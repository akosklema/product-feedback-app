import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getFeedbackListSlice,
  getFilteredSuggestions
} from '../redux/selectors/feedbackList';
import { getAllFeedback, resetFeedbackList } from '../redux/actions/feedbackList';

function useSuggestions(currentPage, feedbacksPerPage, category) {
  const dispatch = useDispatch();

  const feedbackListSlice = useSelector(getFeedbackListSlice);
  const suggestions = useSelector(getFilteredSuggestions);

  useEffect(() => {
    dispatch(getAllFeedback(currentPage, feedbacksPerPage, category, 'suggestion'))
      .then()
      .catch((error) => console.log(error.message));
    
    return () => {
      dispatch(resetFeedbackList());
    };
  }, [currentPage, feedbacksPerPage, category, dispatch]);

  return {
    suggestions,
    feedbackListSlice
  };
};

export default useSuggestions;