import classes from './paragraphs.module.css';

export function Body1({ children, className }) {
  return (
    <p className={`${classes['body--1']} ${className}`}>
      {children}
    </p>
  );
};

export function Body2({ children, className }) {
  return (
    <p className={`${classes['body--2']} ${className}`}>
      {children}
    </p>
  );
};

export function Body3({ children, className }) {
  return (
    <p className={`${classes['body--3']} ${className}`}>
      {children}
    </p>
  );
};