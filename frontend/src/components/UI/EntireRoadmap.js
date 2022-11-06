import RoadmapColumn from './RoadmapColumn';

import classes from './EntireRoadmap.module.css';

function EntireRoadmap({ planned, inProgress, live, updateHandler }) {
  return (
    <div className={classes['feedbacks-container']}>
      <RoadmapColumn title="Planned" feedbackList={planned} description="Ideas prioritized for research" updateHandler={updateHandler} />
      <RoadmapColumn title="In-Progress" feedbackList={inProgress} description="Currently being developed" updateHandler={updateHandler} />
      <RoadmapColumn title="Live" feedbackList={live} description="Released features" updateHandler={updateHandler} />
    </div>
  );
};

export default EntireRoadmap;