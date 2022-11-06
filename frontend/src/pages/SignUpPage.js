import { useSelector } from 'react-redux';

import SignUpForm from '../components/forms/SignUpForm';
import CircleIconContainer from '../components/UI/CircleIconContainer';
import SignUpSVG from '../components/SVGs/SignUpSVG';
import LoadingBar from '../components/UI/LoadingBar';

import classes from './FormPages.module.css';

function SignUpPage() {
  const { isLoading } = useSelector(state => state.auth);

  return (
    <section className={classes['new-feedback-section']}>
      {isLoading && <LoadingBar />}
      <div className={`${classes['form-container']} ${classes['margin-top-2']}`}>
        <CircleIconContainer className={classes['circle']}>
          <SignUpSVG className={classes['plus-icon']} />
        </CircleIconContainer>
        <SignUpForm />
      </div>
    </section>
  );
};

export default SignUpPage;