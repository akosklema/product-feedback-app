import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getFeedbackSlice } from '../redux/selectors/oneFeedback';
import { getFeedback } from '../redux/actions/oneFeedback';

function useOneFeedback(feedbackId) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loaded, feedback, error } = useSelector(getFeedbackSlice);

  useEffect(() => {
    dispatch(getFeedback(feedbackId))
      .then()
      .catch(() => navigate('/feedback-not-found'));
  }, [feedbackId, dispatch, navigate]);

  return { feedback, feedbackIsLoaded: loaded, feedbackError: error };
};

export default useOneFeedback;