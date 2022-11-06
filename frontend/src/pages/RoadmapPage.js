import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useViewportWidth from '../hooks/useViewportWidth';
import useRoadmapFeedbacks from '../hooks/useRoadmapFeedbacks';

import { Button1, BackButton } from '../components/UI/buttons';
import { H3 } from '../components/UI/headers';
import RoadmapTabComponent from '../components/UI/RoadmapTabComponent';
import EntireRoadmap from '../components/UI/EntireRoadmap';
import LoadingBar from '../components/UI/LoadingBar';

import classes from './RoadmapPage.module.css';

function RoadmapPage() {
  const navigate = useNavigate();
  const viewportWidth = useViewportWidth();

  const {
    plannedFeedbacks,
    inProgressFeedbacks,
    liveFeedbacks,
    feedbackListSlice
  } = useRoadmapFeedbacks();

  return (
    <section className={classes['roadmap-section']}>
      {feedbackListSlice.loading && <LoadingBar />}
      {feedbackListSlice.loaded && (
      <div className={classes['section-container']}>
        <header className={classes['header']}>
          <div className={classes['header__left-col']}>
            <BackButton type="light" clickHandler={() => navigate('/suggestions')} />
            <H3 className={classes['header__title']}>Roadmap</H3>
          </div>
          <Button1
            className={classes['add-feedback-button']}
            clickHandler={() => navigate('/create-feedback')}
          >
            + Add Feedback
          s</Button1>
        </header>

        <div>
          {
            viewportWidth < 768 ?
            <RoadmapTabComponent
              planned={plannedFeedbacks}
              inProgress={inProgressFeedbacks}
              live={liveFeedbacks}
            /> :
            <EntireRoadmap
              planned={plannedFeedbacks}
              inProgress={inProgressFeedbacks}
              live={liveFeedbacks}
            />
          }
        </div>
      </div>)}
    </section>
  );
};

export default RoadmapPage;