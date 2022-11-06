import { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useInput from '../../hooks/useInput';
import { login } from '../../redux/actions/auth';
import { validateEmail, validatePassword } from '../../utils/input-validation';

import Form from '../UI/form-components/Form';
import InputLabel from '../UI/form-components/InputLabel';
import TextInput from '../UI/form-components/TextInput';
import { H1, H4 } from '../UI/headers';
import { Button1, Button3, Button2 } from '../UI/buttons';
import Modal from '../UI/Modal';

import classes from './CreateFeedbackForm.module.css';

function LoginForm() {
  const {
    value: email,
    errorMessage: emailError,
    checkValueIsEmpty: checkEmailIsEmpty,
    valueChangeHandler: emailChangeHandler,
    resetField: resetEmailField,
    setErrorMessage: setEmailErrorMessage
  } = useInput('');

  const {
    value: password,
    errorMessage: passwordError,
    checkValueIsEmpty: checkPasswordIsEmpty,
    valueChangeHandler: passwordChangeHandler,
    resetField: resetPasswordField,
    setErrorMessage: setPasswordErrorMessage
  } = useInput('');

  const [modalActive, setModalActive] = useState(false);
  const [modalMessage, setModalMessage] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = (event) => {
    event.preventDefault();

    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);

    if (!emailValid) {
      setEmailErrorMessage('Please enter a valid email address.');
    }

    if (!passwordValid) {
      setPasswordErrorMessage('The password should be at least 6 characters');
    }

    const emailEmpty = checkEmailIsEmpty('Email');
    const passwordEmpty = checkPasswordIsEmpty('Password');

    if (emailEmpty || passwordEmpty || !emailValid || !passwordValid) {
      return;
    }

    dispatch(login(email, password))
      .then(() => {
        navigate('/suggestions');
      })
      .catch((error) => {
        console.log(error);
        setModalMessage(error.message);
        setModalActive(true);
      });
  };


  const goToSignupHandler = (event) => {
    event.preventDefault();
    navigate('/signup');
  };

  const goToForgotPwHandler = (event) => {
    event.preventDefault();
    navigate('/forgot-password');
  };

  const closeModal = () => {
    setModalMessage('');
    setModalActive(false);
  };

  return (
    <Fragment>
      {
        modalActive &&
          <Modal
            error={true}
            handleClick={closeModal}
            buttonText='Close'
          >
           {modalMessage}
          </Modal>
      }
      <Form submitHandler={loginHandler} className={classes['form']}>
        <H1>Login</H1>
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
        <div>
          <InputLabel id="password">
            <H4 className={classes['label-header']}>Password</H4>
            <p className={classes['description']}>
              Enter your password
            </p>
          </InputLabel>
          <TextInput
            type="password"
            value={password}
            changeHandler={passwordChangeHandler}
            errorMessage={passwordError}
            className={classes['form-input']}
            id="password"
          />
        </div>
        
        <div className={classes['button-container']}>
          <Button1 className={classes['btn--add-feedback']} clickHandler={loginHandler}>Login</Button1>
          <Button3 className={classes['btn--add-cancel']} clickHandler={goToSignupHandler}>Go To Sign Up</Button3>
          <Button2 className={classes['btn--add-delete']} clickHandler={goToForgotPwHandler}>Forgot Password?</Button2>
        </div>
      </Form>
    </Fragment>
  );
};

export default LoginForm;