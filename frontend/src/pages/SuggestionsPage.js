import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import useSuggestions from '../hooks/useSuggestions';

import { H2 } from '../components/UI/headers';
import { Button1 } from '../components/UI/buttons';
import HamburgerSVG from '../components/SVGs/HamburgerSVG';
import CloseSVG from '../components/SVGs/CloseSVG';
import CategoryTags from '../components/UI/CategoryTags';
import Roadmap from '../components/UI/Roadmap';
import SortByDropdown from '../components/UI/SortByDropdown';
import SuggestionContainer from '../components/containers/SuggestionContainer';
import UserMenu from '../components/UI/UserMenu';
import LoadingBar from '../components/UI/LoadingBar';
import NoFeedback from '../components/UI/NoFeedback';
import PaginationArrows from '../components/UI/PaginationArrows';

import classes from './SuggestionsPage.module.css';

function SuggestionsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [searchParam] = useSearchParams();
  const category = searchParam.get('category');
  const currentPage = searchParam.get('page');

  const navigate = useNavigate();

  const { isLoading: userIsLoading, loaded: userIsLoaded, loggedInUser } = useLoggedInUser();
  
  const {
    suggestions,
    feedbackListSlice,
  } = useSuggestions(currentPage, 5, category);
  
  const openMenuHandler = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <section className={classes['suggestions-section']}>
      {(userIsLoading || feedbackListSlice.loading) && <LoadingBar />}
      <div className={classes['header-container']}>
        <header className={classes['header']}>
          <div className={classes['title-container']}>
            <H2 className={classes['header__title']}>Frontend Mentor</H2>
            <p className={classes['header__subtitle']}>Feedback Board</p>
          </div>
          {
            isMenuOpen ?
            <CloseSVG className={classes['icon']} clickHandler={openMenuHandler} /> :
            <HamburgerSVG className={classes['icon']} clickHandler={openMenuHandler} />
          }
        </header>
        <div className={`${classes['board-content']} ${isMenuOpen ? classes['board-content--open'] : ''}`}>
          <CategoryTags />
          {feedbackListSlice.loaded &&
            <Roadmap
              plannedFeedbacksLength={feedbackListSlice.plannedCount}
              inProgressFeedbacksLength={feedbackListSlice.inProgressCount}
              liveFeedbacksLength={feedbackListSlice.liveCount}
          />}
          {userIsLoaded && <UserMenu loggedInUser={loggedInUser} />}
        </div>
      </div>

      <div className={classes['feedbacks']}>
        <div className={`${classes['backdrop']} ${isMenuOpen ? classes['backdrop--active'] : ''}`}></div>
        <div className={classes['feedbacks-header']}>
          <SortByDropdown />
          <Button1 className={classes['add-feedback-button']} clickHandler={() => navigate('/create-feedback')}>
            + Add Feedback
          </Button1>
        </div>
        <div className={classes['feedback-container']}>
        {
          (loggedInUser && feedbackListSlice.loaded) && (
            suggestions.length === 0 ?
          <NoFeedback className={classes['no-feedback-container']} /> :
          <SuggestionContainer
            suggestions={suggestions}
            clickable={true}
            navigate={navigate}
            loggedInUser={loggedInUser}
          />)
        }
        </div>
        {
          feedbackListSlice.loaded &&
          <PaginationArrows
            className={classes['pagination-arrows']}
            feedbackCount={feedbackListSlice.totalItems}
          />
        }
      </div>
    </section>
  );
};

export default SuggestionsPage;