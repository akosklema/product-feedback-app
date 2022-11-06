import LeftArrow from '../SVGs/LeftArrow';

import classes from './buttons.module.css';

export function Button1({ children, clickHandler, className }) {
  return (
    <button onClick={clickHandler} className={`${classes['button']} ${classes['button--1']} ${className}`}>
      {children}
    </button>
  );
};

export function Button2({ children, clickHandler, className }) {
  return (
    <button onClick={clickHandler} className={`${classes['button']} ${classes['button--2']} ${className}`}>
      {children}
    </button>
  );
};

export function Button3({ children, clickHandler, className }) {
  return (
    <button onClick={clickHandler} className={`${classes['button']} ${classes['button--3']} ${className}`}>
      {children}
    </button>
  );
};

export function Button4({ children, clickHandler, className }) {
  return (
    <button onClick={clickHandler} className={`${classes['button']} ${classes['button--4']} ${className}`}>
      {children}
    </button>
  );
};

export function BackButton({ type="dark", clickHandler, className }) {
  return (
    <button
      onClick={clickHandler}
      className={`${classes['button--back']} ${type === 'light' ? classes['button--back--light'] : undefined} ${className}`}
    >
      <LeftArrow className={type === 'light' ? classes['back-arrow-light'] : undefined}/>
      Go Back
    </button>
  );
};

export function ReplyButton({ children, clickHandler, className }) {
  return (
    <button
      onClick={clickHandler}
      className={`${classes['button--reply']} ${className}`}
    >
      {children}
    </button>
  );
};