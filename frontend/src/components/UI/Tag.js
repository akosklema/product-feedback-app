import classes from './Tag.module.css';

function Tag({ label, active, clickHandler, className }) {
  let labelToDisplay;
  if (label.length === 2) {
    labelToDisplay = label.toUpperCase();
  } else {
    labelToDisplay = `${label[0].toUpperCase()}${label.slice(1)}`
  }
  return (
    <div
      className={`${classes['tag']} ${active && classes['tag--active']} ${className}`}
      onClick={clickHandler}
    >
      {labelToDisplay}
    </div>
  );
};

export default Tag;