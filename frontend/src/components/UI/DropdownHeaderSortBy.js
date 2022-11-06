import DownArrow from '../SVGs/DownArrow';

import classes from './DropdownHeaderSortBy.module.css'

function DropdownHeaderSortBy({ activeField, active, clickHandler }) {
  return (
    <button
      className={`${classes['dropdown-header']} ${active && classes['dropdown-header--active']}`}
      onClick={clickHandler}
    >
      Sort by :
      <span> {activeField}</span>
      <DownArrow className={`${classes['down-arrow']} ${active && classes['animate-arrow-up']}`} />
    </button>
  );
};

export default DropdownHeaderSortBy;