import CheckSVG from '../SVGs/CheckSVG';

import classes from './DropdownOption.module.css';

function DropdownOption({ label, active, clickHandler }) {
  return (
    active ? 
      (
      <div className={classes['dropdown-option']} onClick={clickHandler}>
        {label}
        <CheckSVG />
      </div>
    ) : (
      <div className={classes['dropdown-option']} onClick={clickHandler}>
        {label}
      </div> 
    )
  );
};

export default DropdownOption;