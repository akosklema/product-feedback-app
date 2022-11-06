import { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import useOneFeedback from '../hooks/useOneFeedback';

import { Button2, BackButton } from '../components/UI/buttons';
import { H3 } from '../components/UI/headers';
import LoadingBar from '../components/UI/LoadingBar';
import FeedbackCard from '../components/cards/FeedbackCard';
import CommentContainer from '../components/containers/CommentContainer';
import AddCommentForm from '../components/forms/AddCommentForm';

import classes from './FeedbackDetailPage.module.css';

function FeedbackDetailPage() {
  const navigate = useNavigate();
  const { feedbackId } = useParams();
  
  const { isLoading: userIsLoading, loaded: userIsLoaded,  loggedInUser } = useLoggedInUser();
  const { feedbackIsLoaded, feedback, feedbackError } = useOneFeedback(feedbackId);
  
  return (
    <Fragment>
      {(userIsLoading) && <LoadingBar />}
      {(feedbackIsLoaded && userIsLoaded) &&
        <section className={classes['feedback-details-section']}>
          <div className={classes['feedback-details-container']}>
            <div className={classes['buttons-top-container']}>
              <BackButton clickHandler={() => navigate('/suggestions')} />
              <Button2 className={classes['edit-button']} clickHandler={() => navigate(`/feedbacks/${feedbackId}/edit`)}>
                Edit Feedback
              </Button2>
            </div>
            <FeedbackCard feedback={feedback} loggedInUser={loggedInUser} />
            <div className={classes['comment-list-container']}>
              <H3 className={classes['comment-title']}>{feedback.commentsCount} Comments</H3>
              {feedback.comments &&
                <CommentContainer
                  feedback={feedback}
                  loggedInUser={loggedInUser}
                />
              }
            </div>
            <AddCommentForm
              className={classes['add-comment']}
              loggedInUser={loggedInUser}
              feedback={feedback}
            />
          </div>
        </section>
      }
    </Fragment>
  );
};

export default FeedbackDetailPage;