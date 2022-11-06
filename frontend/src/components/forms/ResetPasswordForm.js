import { useState, Fragment } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import useInput from '../../hooks/useInput';
import { validatePassword } from '../../utils/input-validation';
import { resetPassword } from '../../services/auth';

import Form from '../UI/form-components/Form';
import InputLabel from '../UI/form-components/InputLabel';
import TextInput from '../UI/form-components/TextInput';
import { H1, H4 } from '../UI/headers';
import { Button1 } from '../UI/buttons';
import Modal from '../UI/Modal';

import classes from './CreateFeedbackForm.module.css';

function ResetPasswordForm() {
  const {
    value: password,
    errorMessage: passwordError,
    checkValueIsEmpty: checkPasswordIsEmpty,
    valueChangeHandler: passwordChangeHandler,
    resetField: resetPasswordField,
    setErrorMessage: setPasswordErrorMessage
  } = useInput('');

  const { resetPwToken } = useParams();

  const [modalActive, setModalActive] = useState(false);
  const [error, setError] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const navigate = useNavigate();

  const resetPasswordHandler = (event) => {
    event.preventDefault();

    const passwordValid = validatePassword(password);

    if (!passwordValid) {
      setPasswordErrorMessage('The password should be at least 6 characters');
    }

    const passwordEmpty = checkPasswordIsEmpty('Password');

    if (passwordEmpty || !passwordValid) {
      return;
    }

    resetPassword(resetPwToken, password)
      .then(() => {
        setError(false);
        setModalActive(true);
        setModalMessage('You have successfully changed the password, You can login with it.');
        resetPasswordField();
      })
      .catch((error) => {
        console.log(error.message)
        setModalMessage(`Failed to reset the password. Please go to forgot password page and\
          request a new reset password email.`)
        setModalActive(true);
        setError(true);
      });
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <Fragment>
      {
        modalActive &&
          <Modal
            error={error}
            handleClick={error ? goToForgotPassword : goToLogin}
            buttonText={error ? 'Go to Forgot Password Page' : 'Go To Login'}
          >
           {modalMessage}
          </Modal>
      }
      <Form submitHandler={resetPasswordHandler} className={classes['form']}>
        <H1>Reset password</H1>
        <div>
          <InputLabel id="password">
            <H4 className={classes['label-header']}>New Password</H4>
            <p className={classes['description']}>
              Enter your new password (it should be at least 6 characters)
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
          <Button1 className={classes['btn--add-feedback']}>Reset Password</Button1>
        </div>
      </Form>
    </Fragment>
  );
};

export default ResetPasswordForm;