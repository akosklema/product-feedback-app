import ReactDOM from 'react-dom';

import classes from './LoadingBar.module.css';

function LoadingBar() {
  return (
    ReactDOM.createPortal(
      <div className={classes['loading-bar']}></div>,
      document.getElementById('loading-bar')
    )
  );
};

export default LoadingBar;