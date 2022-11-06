import React from 'react';

function TagContainer({ children, activeTag, activateTagHandler }) {
  return (
    children.map(child => {
      return React.cloneElement(child, {
        key: child.props.label,
        active: activeTag === child.props.label,
        clickHandler: activateTagHandler.bind(null, child.props.label)
      })
    })
  );
};

export default TagContainer;