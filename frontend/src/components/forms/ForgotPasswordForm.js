import { useState, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useInput from '../../hooks/useInput';
import { validateEmail } from '../../utils/input-validation';
import { forgotPassword } from '../../services/auth';

import Form from '../UI/form-components/Form';
import InputLabel from '../UI/form-components/InputLabel';
import TextInput from '../UI/form-components/TextInput';
import { H1, H4 } from '../UI/headers';
import { Button1, Button3, Button2 } from '../UI/buttons';
import Modal from '../UI/Modal';

import classes from './CreateFeedbackForm.module.css';

function ResetPasswordForm() {
  const {
    value: email,
    errorMessage: emailError,
    checkValueIsEmpty: checkEmailIsEmpty,
    valueChangeHandler: emailChangeHandler,
    resetField: resetEmailField,
    setErrorMessage: setEmailErrorMessage
  } = useInput('');

  const [modalActive, setModalActive] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const navigate = useNavigate();

  const resetEmailHandler = (event) => {
    event.preventDefault();

    const emailValid = validateEmail(email);

    if (!emailValid) {
      setEmailErrorMessage('Please enter a valid email address.');
    }

    const emailEmpty = checkEmailIsEmpty('Email');

    if (emailEmpty || !emailValid) {
      return;
    }

    forgotPassword(email)
      .then(() => {
        setModalActive(true);
        setModalMessage('We have sent you an email. Please, check your inbox.');
        resetEmailField();
      })
      .catch((error) => {
          if (error.message = 'User not found') {
            setModalMessage(`The email address is not registered.`);
          } else {
            setModalMessage(`We couldn't send you the password reset email, please try again.`);
          }
          setModalActive(true);
          setErrorModal(true);
      });
  };


  const goToSignupHandler = (event) => {
    event.preventDefault();
    navigate('/signup');
  };

  const goToLoginHandler = (event) => {
    event.preventDefault();
    navigate('/login');
  };

  const closeModal = () => {
    setModalActive(false);
    setErrorModal(false);
    setModalMessage('');
  };

  return (
    <Fragment>
      {
        modalActive &&
          <Modal
            error={errorModal}
            handleClick={closeModal}
            buttonText='Close'
          >
           {modalMessage}
          </Modal>
      }
      <Form submitHandler={resetEmailHandler} className={classes['form']}>
        <H1>Reset password</H1>
        <div>
          <InputLabel id="email">
            <H4 className={classes['label-header']}>Email</H4>
            <p className={classes['description']}>
              Enter your email address
            </p>
          </InputLabel>
          <TextInput
            type="email"
            value={email}
            changeHandler={emailChangeHandler}
            errorMessage={emailError}
            className={classes['form-input']}
            id="email"
          />
        </div>
        
        <div className={classes['button-container']}>
          <Button1 className={classes['btn--add-feedback']}>Send Email</Button1>
          <Button3 className={classes['btn--add-cancel']} clickHandler={goToLoginHandler}>Login</Button3>
          <Button2 className={classes['btn--add-delete']} clickHandler={goToSignupHandler}>Sign Up</Button2>
        </div>
      </Form>
    </Fragment>
  );
};

export default ResetPasswordForm;