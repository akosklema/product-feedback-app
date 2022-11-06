import { forwardRef } from 'react';

import classes from './TextInput.module.css';

function TextAreaInput({ value, placeholder, id, className, changeHandler, errorMessage, rows, maxLength }, ref) {
  return (
    <div className={classes['input-container']}>
      <textarea
        value={value}
        placeholder={placeholder}
        id={id}
        rows={rows}
        className={`${classes['text-input']} ${classes['text-area']} ${errorMessage && classes['text-input--error']} ${className}`}
        onChange={changeHandler}
        maxLength={maxLength}
        ref={ref}
      />
    {errorMessage && <p className={classes['error-message']}>{errorMessage}</p>}
    </div>
  );
};

export default forwardRef(TextAreaInput);