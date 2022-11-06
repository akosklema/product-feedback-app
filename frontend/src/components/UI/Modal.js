import ReactDOM from 'react-dom';

import ErrorSVG from '../SVGs/ErrorSVG';
import CheckCircleSVG from '../SVGs/CheckCircleSVG';
import { Button3 } from './buttons';

import classes from './Modal.module.css';

function Modal({ children, error = false, handleClick, buttonText }) {
  return (
    ReactDOM.createPortal(
      <div className={classes['backdrop']}>
        <div className={classes['modal']}>
          {error ? <ErrorSVG className={classes['error-icon']} /> : <CheckCircleSVG className={classes['ok-icon']} /> }
          <p>{children}</p>
          <Button3 className={classes['button']} clickHandler={handleClick}>{buttonText}</Button3>
        </div>
      </div>,
      document.getElementById('modal-root')
    )
  );
};

export default Modal;