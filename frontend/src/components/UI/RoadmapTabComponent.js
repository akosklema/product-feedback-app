import useActiveValue from '../../hooks/useActiveValue';

import TabHeaderContainer from '../containers/TabHeaderContainer';
import Tab from './Tab';
import FeedbackContainer from '../containers/FeedbackContainer';
import RoadmapHeader from '../UI/RoadmapHeader';

import classes from './RoadmapTabComponent.module.css';

function RoadmapTabComponent({ planned, inProgress, live }) {
  const {activeValue: activeTab, activateValueHandler: activateTabHandler} = useActiveValue('Planned');

  let sum = planned.length;

  if (activeTab === 'In-Progress') {
    sum = inProgress.length;
  } else if (activeTab === 'Live') {
    sum = live.length;
  }

  return (
    <div>
      <div className={classes['tab-header']}>
        <TabHeaderContainer activeTab={activeTab} activateTabHandler={activateTabHandler}>
          <Tab
            label="Planned"
            sum={planned.length}
            className={classes['tab']}
            activeClass={classes['tab--active--planned']}
          />
          <Tab
            label="In-Progress"
            sum={inProgress.length}
            className={classes['tab']}
            activeClass={classes['tab--active--in-progress']}
          />
          <Tab
            label="Live"
            sum={live.length}
            className={classes['tab']}
            activeClass={classes['tab--active--live']}
          />
        </TabHeaderContainer>
      </div>
      <div className={classes['content-container']}>
        <RoadmapHeader title={activeTab} sum={sum} className={classes['content-header']}>
          {activeTab === 'Planned' && "Ideas prioritized for research"}
          {activeTab === 'In-Progress' && "Currently being developed"}
          {activeTab === 'Live' && "Released features"}
        </RoadmapHeader>
        <div className={classes['tabpanel']}>
          {activeTab === 'Planned' && <FeedbackContainer feedbackList={planned} />}
          {activeTab === 'In-Progress' && <FeedbackContainer feedbackList={inProgress} />}
          {activeTab === 'Live' && <FeedbackContainer feedbackList={live} />}
        </div>
      </div>
    </div>

  );
};

export default RoadmapTabComponent;