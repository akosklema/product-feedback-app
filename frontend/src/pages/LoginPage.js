import { useSelector } from 'react-redux';

import LoginForm from '../components/forms/LoginForm';
import CircleIconContainer from '../components/UI/CircleIconContainer';
import LoginSVG from '../components/SVGs/LoginSVG';
import LoadingBar from '../components/UI/LoadingBar';

import classes from './FormPages.module.css';

function LoginPage() {
  const { isLoading } = useSelector(state => state.auth);

  return (
    <section className={classes['new-feedback-section']}>
      {isLoading && <LoadingBar />}
      <div className={`${classes['form-container']} ${classes['margin-top']}`}>
        <CircleIconContainer className={classes['circle']}>
          <LoginSVG className={classes['login-icon']} />
        </CircleIconContainer>
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;