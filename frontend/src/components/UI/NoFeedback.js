import { useNavigate } from 'react-router-dom';

import { H1 } from '../UI/headers';
import { Body1 } from '../UI/paragraphs';
import { Button1 } from '../UI/buttons';
import EmptyIllustrationSVG from '../SVGs/EmptyIllustrationSVG';

import classes from './NoFeedback.module.css';

function NoFeedback({ className }) {
  const navigate = useNavigate();

  return (
    <div className={className}>
      <EmptyIllustrationSVG className={classes['empty-illustration']} />
      <H1 className={classes['empty-title']}>There is no feedback yet</H1>
      <Body1 className={classes['empty-text']}>
        Got a suggestion? Found a bug that needs to be squashed?
        We love hearing about new ideas to improve our app.
      </Body1>
      <Button1
        className={classes['add-feedback-button']}
        clickHandler={() => navigate('/create-feedback')}
      >
        + Add Feedback
      </Button1>
    </div>
  );
};

export default NoFeedback;