import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';

import UserProfileForm from '../components/forms/UserProfileForm';
import LoadingBar from '../components/UI/LoadingBar';
import { BackButton } from '../components/UI/buttons';

import classes from './FormPages.module.css';

function UserProfilePage() {
  const navigate = useNavigate();

  const { isLoading: userIsLoading, loaded: userIsLoaded, loggedInUser } = useLoggedInUser();

  return (
    <Fragment>
      {userIsLoading && <LoadingBar />}
      {userIsLoaded &&
        <section className={classes['new-feedback-section']}>
          <BackButton clickHandler={() => navigate('/suggestions')} />
          <div className={classes['form-container']}>
            <UserProfileForm loggedInUser={loggedInUser} />
          </div>
        </section>}
    </Fragment>
  );
};

export default UserProfilePage;