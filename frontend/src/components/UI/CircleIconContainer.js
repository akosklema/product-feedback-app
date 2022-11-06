import classes from './CircleIconContainer.module.css';

function CircleIconContainer({ children, className }) {
  return (
    <div className={`${classes['circle-container']} ${className}`}>
      {children}
    </div>
  );
};

export default CircleIconContainer;