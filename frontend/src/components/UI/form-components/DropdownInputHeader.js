import DownArrow from '../../SVGs/DownArrow';

import classes from './DropdownInputHeader.module.css'

function DropdownInputHeader({ activeField, active, className, clickHandler }) {
  return (
    <div
      className={`${classes['dropdown-header']} ${active && classes['dropdown-header--active']} ${className}`}
      onClick={clickHandler}
    >
      <span>{activeField}</span>
      <DownArrow className={`${classes['down-arrow']} ${active && classes['animate-arrow-up']}`} />
    </div>
  );
};

export default DropdownInputHeader;