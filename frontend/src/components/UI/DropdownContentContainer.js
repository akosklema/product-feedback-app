import React from 'react';

import classes from './DropdownContentContainer.module.css';

function DropdownContentContainer({ children, activeField, selectOptionHandler, isDropdownActive, className }) {
  return (
    <div className={`${classes['dropdown-content']} ${isDropdownActive && classes['dropdown-content-active']} ${className}`}>
      {children.map(child => {
        return React.cloneElement(child, {
          key: child.props.label,
          active: activeField === child.props.label,
          clickHandler: selectOptionHandler.bind(null, child.props.label)
        });
      })}
    </div>
  );
};

export default DropdownContentContainer;