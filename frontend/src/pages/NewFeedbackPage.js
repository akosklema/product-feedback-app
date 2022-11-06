import { useNavigate } from 'react-router-dom';

import CreateFeedbackForm from '../components/forms/CreateFeedbackForm';
import CircleIconContainer from '../components/UI/CircleIconContainer';
import { BackButton } from '../components/UI/buttons';
import PlusSVG from '../components/SVGs/PlusSVG';

import classes from './FormPages.module.css';

function NewFeedbackPage() {
  const navigate = useNavigate();

  return (
    <section className={classes['new-feedback-section']}>
      <BackButton className={classes['back-button']} clickHandler={() => navigate('/suggestions')} />
      <div className={classes['form-container']}>
        <CircleIconContainer className={classes['circle']}>
          <PlusSVG className={classes['plus-icon']} />
        </CircleIconContainer>
        <CreateFeedbackForm />
      </div>
    </section>
  );
};

export default NewFeedbackPage;