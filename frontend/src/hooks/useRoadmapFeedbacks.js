import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getFeedbackListSlice,
  getPlannedFeedbacks,
  getInProgressFeedbacks,
  getLiveFeedbacks
} from '../redux/selectors/feedbackList';
import { getRoadmapFeedbacks } from '../redux/actions/feedbackList';

function useRoadmapFeedback(currentPage, feedbacksPerPage, category) {
  const dispatch = useDispatch();

  const feedbackListSlice = useSelector(getFeedbackListSlice);
  const plannedFeedbacks = useSelector(getPlannedFeedbacks);
  const inProgressFeedbacks = useSelector(getInProgressFeedbacks);
  const liveFeedbacks = useSelector(getLiveFeedbacks);

  useEffect(() => {
    dispatch(getRoadmapFeedbacks(['planned', 'in-progress', 'live']))
      .then()
      .catch((error) => console.log(error.message));
    
    // return () => {
    //   dispatch(resetFeedbackList());
    // };
  }, [category, dispatch]);

  return {
    plannedFeedbacks,
    inProgressFeedbacks,
    liveFeedbacks,
    feedbackListSlice
  };
};

export default useRoadmapFeedback;