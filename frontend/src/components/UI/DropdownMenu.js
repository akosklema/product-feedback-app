import { forwardRef } from 'react';

function DropdownMenu({ children, className }, ref) {
  return (
    <div style={{ position: 'relative' }} tabIndex="0" ref={ref} className={className}>
      {children}
    </div>
  );
};

export default forwardRef(DropdownMenu);