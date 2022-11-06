import { useSelector } from 'react-redux';

import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import CircleIconContainer from '../components/UI/CircleIconContainer';
import LockSVG from '../components/SVGs/LockSVG';
import LoadingBar from '../components/UI/LoadingBar';

import classes from './FormPages.module.css';

function ForgotPasswordPage() {
  const { isLoading } = useSelector(state => state.auth);

  return (
    <section className={classes['new-feedback-section']}>
      {isLoading && <LoadingBar />}
      <div className={`${classes['form-container']} ${classes['margin-top']}`}>
        <CircleIconContainer className={classes['circle']}>
          <LockSVG className={classes['login-icon']} />
        </CircleIconContainer>
        <ForgotPasswordForm />
      </div>
    </section>
  );
};

export default ForgotPasswordPage;