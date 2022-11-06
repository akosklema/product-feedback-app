import classes from './headers.module.css';

export function H1({ children, className }) {
  return (
    <h1 className={`${classes['header--1']} ${className}`}>
      {children}
    </h1>
  );
};

export function H2({ children, className }) {
  return (
    <h2 className={`${classes['header--2']} ${className}`}>
      {children}
    </h2>
  );
};

export function H3({ children, className }) {
  return (
    <h3 className={`${classes['header--3']} ${className}`}>
      {children}
    </h3>
  );
};

export function H4({ children, className }) {
  return (
    <h4 className={`${classes['header--4']} ${className}`}>
      {children}
    </h4>
  );
};