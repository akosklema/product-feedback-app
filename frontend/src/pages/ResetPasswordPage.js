import { useSelector } from 'react-redux';

import ResetPasswordForm from '../components/forms/ResetPasswordForm';
import CircleIconContainer from '../components/UI/CircleIconContainer';
import LockSVG from '../components/SVGs/LockSVG';
import LoadingBar from '../components/UI/LoadingBar';

import classes from './FormPages.module.css';

function ResetPasswordPage() {
  const { isLoading } = useSelector(state => state.auth);

  return (
    <section className={classes['new-feedback-section']}>
      {isLoading && <LoadingBar />}
      <div className={`${classes['form-container']} ${classes['margin-top']}`}>
        <CircleIconContainer className={classes['circle']}>
          <LockSVG className={classes['login-icon']} />
        </CircleIconContainer>
        <ResetPasswordForm />
      </div>
    </section>
  );
};

export default ResetPasswordPage;