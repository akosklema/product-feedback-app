import RoadmapHeader from '../UI/RoadmapHeader';
import FeedbackContainer from '../containers/FeedbackContainer';

import classes from './RoadmapColumn.module.css';

function RoadmapColumn({ title, feedbackList, description, updateHandler }) {
  return (
    <div className={classes['roadmap-column']}>
      <RoadmapHeader title={title} sum={feedbackList.length} className={classes['header']}>
        {description}
      </RoadmapHeader>
      <div className={classes['feedback-container']}>
        <FeedbackContainer feedbackList={feedbackList} updateHandler={updateHandler} />
      </div>
    </div>
  );
};

export default RoadmapColumn;