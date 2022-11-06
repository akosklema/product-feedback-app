import { useNavigate } from 'react-router-dom';

import { H3 } from './headers';
import { ReplyButton } from './buttons';

import classes from './Roadmap.module.css';

function Roadmap({ className, plannedFeedbacksLength, inProgressFeedbacksLength, liveFeedbacksLength }) {
  const navigate = useNavigate();

  const goToRoadmapPage = () => {
    navigate('/roadmap');
  };

  return (
    <div className={`${classes['roadmap-container']} ${className}`}>
      <div className={classes['title']}>
        <H3>Roadmap</H3>
        <ReplyButton clickHandler={goToRoadmapPage}>View</ReplyButton>
      </div>
      <div className={classes['status-container']}>
        <div className={classes['status']}>
          <p className={`${classes['status-name']} ${classes['status-name--planned']}`}>Planned</p>
          <p className={classes['status-sum']}>{plannedFeedbacksLength}</p>
        </div>
        <div className={classes['status']}>
          <p className={`${classes['status-name']} ${classes['status-name--in-progress']}`}>In-Progress</p>
          <p className={classes['status-sum']}>{inProgressFeedbacksLength}</p>
        </div>
        <div className={classes['status']}>
          <p className={`${classes['status-name']} ${classes['status-name--live']}`}>Live</p>
          <p className={classes['status-sum']}>{liveFeedbacksLength}</p>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;