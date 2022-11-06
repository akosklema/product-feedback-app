import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import ArrowLeftSVG from '../SVGs/ArrowLeftSVG';
import ArrowRightSVG from '../SVGs/ArrowRightSVG';

import classes from './PaginationArrows.module.css';

function PaginationArrows({ className, feedbackCount }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParam, setSearchParam] = useSearchParams();

  const pageParam = searchParam.get('page') || 1;
  const category = searchParam.get('category');

  useEffect(() => {
    if (!parseInt(pageParam, 10)) {
      setCurrentPage(1);
    } else {
      setCurrentPage(parseInt(pageParam, 10));
    }
  }, [pageParam]);

  const fetchNextPage = () => {
    if (currentPage === Math.ceil(feedbackCount / 5) || feedbackCount === 0) {
      return;
    }
    if (category) {
      return setSearchParam({ category, page: currentPage + 1 });
    }

    return setSearchParam({ page: currentPage + 1 });
  };

  const fetchPreviousPage = () => {
    if (currentPage === 1) {
      return;
    }
    if (category) {
      return setSearchParam({ category, page: currentPage - 1 });
    }

    return setSearchParam({ page: currentPage - 1 });
  };

  return (
    <div className={`${classes['pagination-arrows']} ${className}`}>
      <div
        className={`${classes['arrow']} ${currentPage === 1 ? classes['arrow--inactive'] : ''}`}
        onClick={fetchPreviousPage}
      >
        <ArrowLeftSVG className={classes['arrow-icon']} />
      </div>
      <div
        className={`
          ${classes['arrow']}
          ${currentPage === Math.ceil(feedbackCount / 5) ? classes['arrow--inactive'] : ''}
          ${feedbackCount === 0 ? classes['arrow--inactive'] : ''}`
        }
        onClick={fetchNextPage}
      >
        <ArrowRightSVG className={classes['arrow-icon']} />
      </div>
    </div>
  );
};

export default PaginationArrows;