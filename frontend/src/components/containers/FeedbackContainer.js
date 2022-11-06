import useLoggedInUser from '../../hooks/useLoggedInUser';

import FeedbackByStatusCard from '../cards/FeedbackByStatusCard';

function FeedbackContainer({ feedbackList }) {
  const { loaded: userIsLoaded, loggedInUser } = useLoggedInUser();

  return (
    userIsLoaded &&
    feedbackList.map(feedback => {
      return <FeedbackByStatusCard key={feedback._id} feedback={feedback} loggedInUser={loggedInUser} />
    })
  );
};

export default FeedbackContainer;