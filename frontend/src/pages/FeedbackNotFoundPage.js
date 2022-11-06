import { useNavigate } from 'react-router-dom';

import { H1 } from '../components/UI/headers';
import { Body1 } from '../components/UI/paragraphs';
import { Button1, Button2 } from '../components/UI/buttons';
import EmptyIllustrationSVG from '../components/SVGs/EmptyIllustrationSVG';

import classes from './FeedbackNotFoundPage.module.css';

function FeedbackNotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={classes['container']}>
      <EmptyIllustrationSVG />
      <H1>We couldn't find the feedback</H1>
      <Body1>
        The requested feedback doesn't exist. You can see the suggestions on the suggestion page,
        or the feedbacks, which are already on the roadmap, on the roadmap page.
      </Body1>
      <div className={classes['button-container']}>
        <Button1 className={classes['button']} clickHandler={() => navigate('/suggestions')}>To suggestions</Button1>
        <Button2 className={classes['button']} clickHandler={() => navigate('/roadmap')}>To roadmap</Button2>
      </div>
    </div>
  );
};

export default FeedbackNotFoundPage;