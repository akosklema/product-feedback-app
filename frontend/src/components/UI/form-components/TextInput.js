import classes from './TextInput.module.css';

function TextInput({ value, type = "text", errorMessage, id, className, changeHandler }) {
  return (
    <div className={classes['input-container']}>
      <input
        value={value}
        type={type}
        id={id}
        className={`${classes['text-input']} ${errorMessage && classes['text-input--error']} ${className}`}
        onChange={changeHandler}
      />
      {errorMessage && <p className={classes['error-message']}>{errorMessage}</p>}
    </div>
  );
};

export default TextInput;