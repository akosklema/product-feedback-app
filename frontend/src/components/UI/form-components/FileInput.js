import { Fragment } from 'react';

import classes from './FileInput.module.css';

function FileInput({ children, className, onChangeHandler }) {
  return (
    <Fragment>
      <label htmlFor="file" className={className}>{children}</label>
      <input className={classes['file-input']} type="file" id="file" onChange={onChangeHandler} />
    </Fragment>
  );
};

export default FileInput;