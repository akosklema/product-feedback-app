import UpArrow from '../SVGs/UpArrow';

import classes from './UpvoteButton.module.css';

function UpvoteButton({ children, className, clickHandler, active }) {
  return (
    <button
      className={`${classes['button--upvote']} ${active ? classes['button--upvote--active'] : null} ${className}`}
      onClick={clickHandler}>
        <UpArrow className={classes['up-arrow']}
      />
      {children}
    </button>
  );
};

export default UpvoteButton;