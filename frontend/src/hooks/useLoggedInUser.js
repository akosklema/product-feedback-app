import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getLoggedInUser } from '../redux/actions/user';
import { getLoggedInUserSlice } from '../redux/selectors/user';

function useLoggedInUser() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(getLoggedInUserSlice);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getLoggedInUser())
      .then()
      .catch((error) => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('refreshToken');
        navigate('/');
      });
  }, [dispatch, navigate]);

  return loggedInUser;
};

export default useLoggedInUser;