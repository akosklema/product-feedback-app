import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { upvoteFeedback } from '../../redux/actions/oneFeedback';

import Tag from '../UI/Tag';
import UpvoteButton from '../UI/UpvoteButton';

import CommentSVG from '../SVGs/CommentSVG';

import classes from './FeedbackByStatusCard.module.css';

function FeedbackByStatusCard({ feedback, loggedInUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let feedbackStatusClass = classes['feedback--planned']

  if (feedback.status === 'in-progress') {
    feedbackStatusClass = classes['feedback--in-progress']
  } else if (feedback.status === 'live') {
    feedbackStatusClass = classes['feedback--live']
  }

  const isUpvoted = feedback.upvotes.includes(loggedInUser._id);

  const upvoteHandler = () => {
    dispatch(upvoteFeedback(feedback, loggedInUser._id))
      .then()
      .catch((error) => console.log(error.message));
  };

  return (
    <div className={`${classes['feedback']} ${feedbackStatusClass}`}>
      <p className={classes['status']}>{feedback.status}</p>
      <p className={classes['title']} onClick={() => navigate(`/feedbacks/${feedback._id}`)}>{feedback.title}</p>
      <p className={classes['description']}>
        {feedback.description}
      </p>
      <Tag label={feedback.category} className={classes['category-tag']} />
      <div className={classes['last-row']}>
        <UpvoteButton className={classes['upvote-button']} clickHandler={upvoteHandler} active={isUpvoted}>
          {feedback.upvotes.length}
        </UpvoteButton>
        <div className={classes['comment-stat']}>
          <CommentSVG className={classes['comment-icon']} />
          <span>{feedback.commentsCount}</span>
        </div>
      </div>
    </div>
  );
};

export default FeedbackByStatusCard;