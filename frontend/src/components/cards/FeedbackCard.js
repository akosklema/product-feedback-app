import { useDispatch } from 'react-redux';

import { upvoteFeedback } from '../../redux/actions/oneFeedback';

import { H3 } from '../UI/headers';
import { Body1 } from '../UI/paragraphs';
import Tag from '../UI/Tag';
import UpvoteButton from '../UI/UpvoteButton';
import CommentSVG from '../SVGs/CommentSVG';

import classes from './FeedbackCard.module.css';

function FeedbackCard({ feedback, clickable = false, clickHandler, loggedInUser, className }) {
  const dispatch = useDispatch();
  
  const isUpvoted = feedback.upvotes.includes(loggedInUser._id) || false;
  const onCardClickHandler = (event) => {
    if (event.target.closest('BUTTON')) {
      return;
    }
    clickHandler();
  };

  const upvoteHandler = () => {
    dispatch(upvoteFeedback(feedback, loggedInUser._id))
      .then()
      .catch((error) => console.log(error.message));
  };

  return (
    <div
      className={`${classes['feedback-card']} ${clickable ? classes['clickable'] : null} ${className}`}
      onClick={clickable ? onCardClickHandler : null}
    >
      <div className={classes['feedback-details']}>
        <H3 className={classes['feedback-title']}>{feedback.title}</H3>
        <Body1 className={classes['feedback-description']}>{feedback.detail}</Body1>
        <Tag className={classes['feedback-category']} label={feedback.category} />
      </div>
      <UpvoteButton
        className={classes['upvote-button']}
        clickHandler={upvoteHandler}
        active={isUpvoted}
      >
        {feedback.upvotes.length}
      </UpvoteButton>
      <div className={classes['comment-stat']}>
        <CommentSVG className={classes['comment-icon']} />
        <span>{feedback.commentsCount}</span>
      </div>
    </div>
  );
};

export default FeedbackCard;