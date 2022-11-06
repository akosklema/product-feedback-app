import { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useInput from '../../hooks/useInput';
import { signup } from '../../redux/actions/auth';
import { validateEmail, validatePassword } from '../../utils/input-validation';

import Form from '../UI/form-components/Form';
import InputLabel from '../UI/form-components/InputLabel';
import TextInput from '../UI/form-components/TextInput';
import { H1, H4 } from '../UI/headers';
import { Button1, Button3 } from '../UI/buttons';
import Modal from '../UI/Modal';

import classes from './CreateFeedbackForm.module.css';

function SignUpForm() {
  const {
    value: fullname,
    errorMessage: fullnameError,
    checkValueIsEmpty: checkFullnameIsEmpty,
    valueChangeHandler: fullnameChangeHandler,
    resetField: resetFullnameField
  } = useInput('');

  const {
    value: username,
    errorMessage: usernameError,
    checkValueIsEmpty: checkUsernameIsEmpty,
    valueChangeHandler: usernameChangeHandler,
    resetField: resetUsernameField
  } = useInput('');

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
  const [error, setError] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupHandler = async (event) => {
    event.preventDefault();

    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);

    if (!emailValid) {
      setEmailErrorMessage('Please enter a valid email address.');
    }

    if (!passwordValid) {
      setPasswordErrorMessage('The password should be at least 6 characters');
    }

    const fullnameEmpty = checkFullnameIsEmpty('Full name');
    const usernameEmpty = checkUsernameIsEmpty('Username');
    const emailEmpty = checkEmailIsEmpty('Email');
    const passwordEmpty = checkPasswordIsEmpty('Password');

    if (fullnameEmpty || usernameEmpty || emailEmpty || passwordEmpty || !emailValid || !passwordValid) {
      return;
    }

    dispatch(signup(fullname, username, email, password))
      .then(() => {
        setModalMessage('You successfully signed up, you can log in.');
        setModalActive(true);
      })
      .catch((error) => {
        setModalMessage(error.message);
        setError(true)
        setModalActive(true);
      });
  }

  const goToLoginHandler = (event) => {
    event.preventDefault();
    navigate('/login');
  };

  const closeModal = () => {
    setModalMessage('');
    setError(false)
    setModalActive(false);
  };

  return (
    <Fragment>
      {
        modalActive &&
          <Modal
            error={error}
            handleClick={error ? closeModal : goToLoginHandler}
            buttonText={error ? 'Close' : 'Login'}
          >
           {modalMessage}
          </Modal>
      }
      <Form submitHandler={signupHandler} className={classes['form']}>
        <div className={classes['loading']}></div>
        <H1>Create a user</H1>
        <div>
          <InputLabel id="name">
            <H4 className={classes['label-header']}>Full name</H4>
            <p className={classes['description']}>
              Enter your full name
            </p>
          </InputLabel>
          <TextInput
            value={fullname}
            errorMessage={fullnameError}
            changeHandler={fullnameChangeHandler}
            className={classes['form-input']}
            id="name"
          />
        </div>
        <div>
          <InputLabel id="username">
            <H4 className={classes['label-header']}>Username</H4>
            <p className={classes['description']}>
              Enter a username
            </p>
          </InputLabel>
          <TextInput
            value={username}
            errorMessage={usernameError}
            changeHandler={usernameChangeHandler}
            className={classes['form-input']}
            id="username"
          />
        </div>
        <div>
          <InputLabel id="email">
            <H4 className={classes['label-header']}>Email</H4>
            <p className={classes['description']}>
              Enter your email address
            </p>
          </InputLabel>
          <TextInput
            value={email}
            changeHandler={emailChangeHandler}
            errorMessage={emailError}
            type="email"
            className={classes['form-input']}
            id="email"
          />
        </div>
        <div>
          <InputLabel id="password">
            <H4 className={classes['label-header']}>Password</H4>
            <p className={classes['description']}>
            Enter a password (it should be at least 6 characters)
            </p>
          </InputLabel>
          <TextInput
            value={password}
            changeHandler={passwordChangeHandler}
            errorMessage={passwordError}
            type="password"
            className={classes['form-input']}
            id="password"
          />
        </div>
        
        <div className={classes['button-container']}>
          <Button1 className={classes['btn--add-feedback']}>Sign Up</Button1>
          <Button3 className={classes['btn--add-cancel']} clickHandler={goToLoginHandler}>Go to login</Button3>
        </div>
      </Form>
    </Fragment>
  );
};

export default SignUpForm;