import { useParams, useNavigate } from 'react-router-dom';

import useOneFeedback from '../hooks/useOneFeedback';

import EditFeedbackForm from '../components/forms/EditFeedbackForm';
import CircleIconContainer from '../components/UI/CircleIconContainer';
import { BackButton } from '../components/UI/buttons';
import EditFeedbackSVG from '../components/SVGs/EditFeedbackSVG';

import classes from './FormPages.module.css';

function NewFeedbackPage() {
  const { feedbackId } = useParams();

  const { feedbackIsLoaded, feedback, feedbackError } = useOneFeedback(feedbackId);

  const navigate = useNavigate();

  
  return (
    feedbackIsLoaded && (
    <section className={classes['new-feedback-section']}>
      <BackButton
        className={classes['back-button']}
        clickHandler={() => navigate(`/feedback/${feedbackId}`)}
      />
      <div className={classes['form-container']}>
        <CircleIconContainer className={classes['circle']}>
          <EditFeedbackSVG />
        </CircleIconContainer>
        <EditFeedbackForm feedback={feedback} />
      </div>
    </section>)
  );
};

export default NewFeedbackPage;