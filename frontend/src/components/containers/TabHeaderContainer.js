import React from 'react';

function TabHeaderContainer({ children, activeTab, activateTabHandler }) {
  return (
    children.map(child => {
      return React.cloneElement(child, {
        key: child.props.label,
        active: activeTab === child.props.label,
        clickHandler: activateTabHandler.bind(null, child.props.label)
      })
    })
  );
};

export default TabHeaderContainer;